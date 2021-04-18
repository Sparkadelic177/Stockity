import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockDetailsService {
 private _sentimentUrl = "http://localhost:5000/ticker/AAPL/sentiment"
 
  constructor(private _http: HttpClient)  {}

  callSentimentScores(){
    return this._http.get<any>(this._sentimentUrl);
  }

  callCompanyNews(url){
    return this._http.get<any>(url);
  }
}
