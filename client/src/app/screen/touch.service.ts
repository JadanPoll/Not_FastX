import { Injectable } from '@angular/core';
import { ReplaySubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class TouchService {
  private sub = new ReplaySubject (1);
  constructor() {}
  enable (b) {
    this.sub.next (b);
  }
  subscribe (fn = ((b: any) => {})) {
    return this.sub.asObservable ().subscribe (fn);
  }
}
