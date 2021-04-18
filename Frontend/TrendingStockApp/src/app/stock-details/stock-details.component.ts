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
  companyNews: Array<object> = []; 
  wsSubscription: Subscription;
  status;
  positiveSentimentScore = 0;
  negativeSentimentScore = 0;
  ticker = localStorage.getItem("ticker");
  private _newsUrl = `https://finnhub.io/api/v1/company-news?symbol=${this.ticker}&from=2021-03-01&to=2021-03-09&token=${environment.api}`
  private _sentimentUrl = `http://localhost:5000/ticker/${this.ticker}/sentiment`

  constructor(
    private _stockService: StockDetailsService,
    private wsService: WebsocketService,
    @Inject(PLATFORM_ID) private platformId,
    private zone: NgZone
  ) {}

  ngOnInit() {
    const positiveBar = document.getElementById("positive")
    const negativeBar = document.getElementById("negative")
    this._stockService.callSentimentScores(this._sentimentUrl).subscribe(
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

    this._stockService.callCompanyNews(this._newsUrl).subscribe(
      data => {
        this.companyNews = data
      }
    )

    //socket service
    this.wsSubscription = this.wsService
      .createOberservableSocket(
        `wss://ws.finnhub.io?token=${environment.api}`,
        { type: "subscribe", symbol: "AAPL" }
      )
      .subscribe(
        (data) => console.log(data), //reciving
        (err) => console.log(err)
      );

      
  }


  sendMessageToServer(message: object) {
    this.status = this.wsService.sendMessage({
      type: "subscribe",
      symbol: "AAPL",
    });
    console.log(this.status)
  }

  ngAfterViewInit() {

    // Chart code goes in here
    new TradingView.widget({
      width: "100%",
      height: 500,
      symbol: `NASDAQ:${this.ticker}`,
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
  }
}
