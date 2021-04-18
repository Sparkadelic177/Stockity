import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { WebsocketService } from "./websocket.service";
import { map } from 'rxjs/operators';

const MARKET_URL = "wss://api.alpaca.markets/stream";

export interface Stock {
  ticker: string
}

export interface StockDetails {
  price: string,
  timestamp: string
}

@Injectable({
  providedIn: 'root'
})

export class StockPricesService {
  public stocks: Subject<StockDetails>;
  constructor(wsService: WebsocketService) {
    this.stocks = <Subject<StockDetails>>wsService.connect(MARKET_URL).pipe(map(
      (response: MessageEvent): StockDetails => {
        let data = JSON.parse(response.data);
        return {
          price: data.price,
          timestamp: data.timestamp
        }
      }
    ))
   }
}
