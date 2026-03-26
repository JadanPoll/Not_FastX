import { Injectable } from '@angular/core';
import { WindowRef } from "@Common/browser";
import { HttpClient } from "@angular/common/http";
import { ReplaySubject } from "rxjs";
@Injectable()
export class ConfigService {
  private sub = new ReplaySubject (1);
  private subLocal = new ReplaySubject (1);
  constructor (private wref: WindowRef, private http: HttpClient) {
      
  }
  loadUrl (url) {
    this.http.get (url).subscribe (d => this.sub.next (d));
  }
  subscribe (d) {
    return this.sub.asObservable ().subscribe (d);
  }
  subscribeLocal (d) {
    return this.subLocal.asObservable ().subscribe (d);
  }
  loadLocal () {
    try {
      this.subLocal.next (this.wref.localStorage || {})
    } catch (e) {

    }
  }
  saveLocal (key, val) {
    this.wref.localStorage [key] = JSON.stringify (val);
  }

}
