import { Component, OnInit, Input } from '@angular/core';
import { TouchService } from '../screen/touch.service';
import { MwmService } from '../mwm.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  settings$;
  settings: Boolean;
  _hidden: Boolean;
  clickHide: Boolean;
  touch: Boolean;
  t;
  ts$
  mwm$;
  mwm;
  constructor(private ts: TouchService, private mwmService: MwmService) { }
  @Input () config = {} as any;
  ngOnInit() {
    this.hide ();
    this.ts$ = this.ts.subscribe ((t) => {
      clearTimeout (this.t);
      this.touch = t;
      this.unhide ();
    });
    this.mwm$ = this.mwmService.subscribe ((m) => {
      this.mwm = m;
    });
  } 
  ngOnDestroy () {
    this.ts$.unsubscribe ();
    this.mwm$.unsubscribe ();
  }
  click () {
    this.clickHide = false;
    this.hide ();
  }
  hidden () {
    return this._hidden || this.clickHide;
  }
  unhide () { 
    this._hidden = false;
    this.clickHide = false;
  }
  hide () {
    if (this.touch) return;
    this.t = setTimeout (() => {
      this._hidden = true;
      this.clickHide = true;
    }, 5000);
  }
  getHome () {
    return this.config ? this.config.home || {} : {};
  }
  getFm() {
    return this.config ? this.config.fileManager || {} : {};
  }

}
