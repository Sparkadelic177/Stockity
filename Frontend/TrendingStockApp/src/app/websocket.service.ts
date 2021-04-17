import { Injectable } from "@angular/core";
import { AlpacaStream } from "@master-chief/alpaca";

@Injectable()
export class WebsocketService {
  private alpaca: AlpacaStream;
  constructor() {
    this.alpaca = new AlpacaStream({
      credentials: {
        key: "be11d06e4d0fffcfe9241ea012badd8e",
        secret: "6fdd00d0fcc8a610785aa94ede6570699fe15dc9",
        paper: false,
      },
      type: "market_data", // or "account"
      source: "iex", // or "sip" depending on your subscription
    });
  }

  subscribe(tickers: Array<string>) {
    this.alpaca.once("authenticated", () =>
      this.alpaca.subscribe("quotes", [...tickers])
    );
  }

  unsubscribe(tickers){
    this.alpaca.unsubscribe('quotes', [...tickers])
  }

  quotes(){
    this.alpaca.on('quote', (quote) => console.log(quote))
  }
}
