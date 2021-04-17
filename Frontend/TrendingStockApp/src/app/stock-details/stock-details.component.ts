import { Component, OnInit, Inject, NgZone, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { environment } from "../../environments/environment"

// amCharts imports
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { WebsocketService } from "../websocket.service";
import { Subscription } from "rxjs";
import { StockDetailsService } from "../stock-details.service"
declare const TradingView: any;

@Component({
  selector: "app-stock-details",
  templateUrl: "./stock-details.component.html",
  styleUrls: ["./stock-details.component.css"],
  providers: [WebsocketService],
})
export class StockDetailsComponent implements OnInit {
  private chart: am4charts.XYChart;
  liveTrades: Array<object> = [];
  wsSubscription: Subscription;
  status;
  ticker = 'APPL';
  positiveSentimentScore = 0;
  negativeSentimentScore = 0;

  constructor(
    private _stockService: StockDetailsService,
    private wsService: WebsocketService,
    @Inject(PLATFORM_ID) private platformId,
    private zone: NgZone
  ) {}

  ngOnInit() {
    const positiveBar = document.getElementById("positive")
    const negativeBar = document.getElementById("negative")
    this._stockService.callSentimentScores().subscribe(
      data=>
      {
        console.log("success",data)
        this.negativeSentimentScore = Math.floor(10 * data["Negative Score"])
        this.positiveSentimentScore = Math.floor(10 * data["Positive Score"])
        positiveBar.style.width = `${this.positiveSentimentScore}px`
        negativeBar.style.width = `${this.negativeSentimentScore}px`
      },
      err => {
        console.log(err)
      }
    )

    // this.wsSubscription = this.wsService
    //   .createOberservableSocket(
    //     `wss://ws.finnhub.io?token=${environment.api}`,
    //     { type: "subscribe", symbol: "AAPL" }
    //   )
    //   .subscribe(
    //     (data) => this.addToGraph(data), //reciving
    //     (err) => console.log(err)
    //   );
  }

  addToGraph(data) {
    const info = JSON.parse(data);
    if (info.data) {
      const trades = info.data;
      trades.forEach((trade, i) => {
        this.liveTrades.push({
          value: trade.p,
          date: new Date(trade.t),
          name: i,
        });
      });
    }
    this.chart.data = this.liveTrades
    // console.log(info);
  }

  sendMessageToServer(message: object) {
    this.status = this.wsService.sendMessage({
      type: "subscribe",
      symbol: "AAPL",
    });
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {


    new TradingView.widget({
      width: "100%",
      height: 500,
      symbol: "BINANCE:BTCUSDT",
      interval: "D",
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "in",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      allow_symbol_change: true,
      container_id: "tradingview_71d31",
    });

    // Chart code goes in here
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create("chartdiv", am4charts.XYChart);

      chart.paddingRight = 20;

      chart.data = this.liveTrades;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";
      series.tooltipText = "{valueY.value}";

      chart.cursor = new am4charts.XYCursor();

      // let scrollbarX = new am4charts.XYChartScrollbar();
      // scrollbarX.series.push(series);
      // chart.scrollbarX = scrollbarX;

      this.chart = chart;
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
