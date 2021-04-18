import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { map, filter, switchMap, retryWhen, delay } from 'rxjs/operators';
import { EMPTY, Observable, Subject } from 'rxjs';

export class DataService {
  private connection$: WebSocketSubject<any>;
  RETRY_SECONDS = 10;
  connect(): Observable<any> {
    return this.store.pipe(select(getApiUrl)).pipe(
      filter((apiUrl) => !!apiUrl),
      // https becomes wws, http becomes ws
      map((apiUrl) => apiUrl.replace(/^http/, "ws") + "/stream"),
      switchMap((wsUrl) => {
        if (this.connection$) {
          return this.connection$;
        } else {
          this.connection$ = webSocket(wsUrl);
          return this.connection$;
        }
      }),
      retryWhen((errors) => errors.pipe(delay(this.RETRY_SECONDS)))
    );
  }
}
