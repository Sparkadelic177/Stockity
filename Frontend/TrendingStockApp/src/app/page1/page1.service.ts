import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Page1Service {
  _url1 ='http://localhost:5000/trending/reddit'
  _url2 ='http://localhost:5000/trending/twitter'

  constructor(private _http: HttpClient) { }
  enroll1()
  {  
    console.log("enroll") 
    return this._http.get<any>(this._url1);
  }
  enroll2()
  {  
    console.log("enroll") 
    return this._http.get<any>(this._url2);
  }
}
