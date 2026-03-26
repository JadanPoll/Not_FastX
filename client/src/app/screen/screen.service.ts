import { Injectable } from '@angular/core';
import { ReplaySubject } from "rxjs";
import { IframeService, GeometryService } from "../starnet";


export enum METHODS {
  RESIZE,
  SCALING,
  REFRESH
}
@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  private sub = new ReplaySubject (1);
  constructor(
    private frame: IframeService,
  ) {}
  refresh() {
    this.sub.next({ type: METHODS.REFRESH})
  }
  resize() {
    this.sub.next({ type: METHODS.RESIZE})
  }
  scale() {
    this.sub.next({ type: METHODS.SCALING })
  }
  subscribe (fn = ((b: any) => {})) {
    return this.sub.asObservable ().subscribe (fn);
  }
}
