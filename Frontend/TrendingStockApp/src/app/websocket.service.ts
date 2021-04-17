import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class WebsocketService {
  ws: WebSocket;
  socketIsOpen = 1;
  createOberservableSocket(url: string, data: object): Observable<any> {
    this.ws = new WebSocket(url);
    
    return new Observable((observer) => {
      this.ws.onopen = () => this.sendMessage(data);

      this.ws.onmessage = (event) => {console.log(event); observer.next(event.data)};

      this.ws.onerror = (event) => observer.error(event);

      this.ws.onclose = () => observer.complete();
    });
  }

  sendMessage(message: object): string{
    debugger
    if(this.ws.readyState === this.socketIsOpen){
      this.ws.send(JSON.stringify({'type':'subscribe', 'symbol': 'GME'}))
      return `send to the server ${message}`
    }else{
      return 'Message was not send - the socket is closed'
    }
  }
}
