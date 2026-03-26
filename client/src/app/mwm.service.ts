import { Injectable } from '@angular/core';
import { ReplaySubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MwmService {
  private sub = new ReplaySubject (1);
  constructor() { }
  setMwm (b) {
    this.sub.next (b);
  }
  subscribe (fn = (d:any) => {}) {
    return this.sub.asObservable ().subscribe (fn);
  }
}
