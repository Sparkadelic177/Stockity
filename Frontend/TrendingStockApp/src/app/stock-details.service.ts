import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockDetailsService {

 
  constructor(private _http: HttpClient)  {}

  callSentimentScores(url){
    return this._http.get<any>(url);
  }

  callCompanyNews(url){
    return this._http.get<any>(url);
  }
}
