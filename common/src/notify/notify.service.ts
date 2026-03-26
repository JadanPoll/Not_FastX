import { Injectable } from '@angular/core';
import { ToastyService, ToastyConfig } from "ngx-toasty";

export enum TYPE {
  DEFAULT = 'default',
  INFO = 'info',
  SUCCESS = 'success',
  WAIT = 'wait',
  ERROR = 'error',
  WARNING = 'warning'
}
export enum POSITION {
   BOTTOM_RIGHT = 'bottom-right',
   BOTTOM_LEFT = 'bottom-left',
   TOP_RIGHT = 'top-right',
   TOP_LEFT =  'top-left', 
   TOP_CENTER =  'top-center',
   BOTTOM_CENTER = "bottom-center",
   CENTER_CENTER = "center-center"
}
@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  get POSITION() { 
    return  POSITION 
  };
  position: POSITION;
  constructor (
    private ts: ToastyService,
    private tc: ToastyConfig
  ) {
    this.tc.theme = "bootstrap";
    this.resetPosition ();
  }
  default = this.notify.bind (this, TYPE.DEFAULT);
  info = this.notify.bind (this, TYPE.INFO);
  wait = this.notify.bind (this, TYPE.WAIT);
  warning = this.notify.bind (this, TYPE.WARNING);
  error = this.notify.bind (this, TYPE.ERROR);
  success = this.notify.bind (this, TYPE.SUCCESS);

  private notify (type: TYPE, o, pos = POSITION.BOTTOM_RIGHT) {
    this.resetPosition();
    this.position = pos;
    return this.ts [type] (o);
  }
  getPosition () {
    return this.position;
  }
  resetPosition () {
    this.position = POSITION.BOTTOM_RIGHT;
  } 
}
