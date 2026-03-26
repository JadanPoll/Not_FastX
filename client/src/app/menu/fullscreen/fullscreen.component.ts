import { Component, OnInit, HostListener } from '@angular/core';
import { GeometryService  } from "../../starnet/settings/geometry.service";
import { WindowRef } from '@Common/browser';
import { MwmService } from '../../mwm.service';


const RESIZE_STORAGE = 'resize';
@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.scss']
})
export class FullscreenComponent implements OnInit {

  constructor(private geom: GeometryService, private wref: WindowRef, private mwmService: MwmService) { }
  pressed;
  resizeTimeout;
  mwm$;
  mwm;
  @HostListener ("window:keydown", ['$event']) onKeydown (e) {
    //this.doResize (win.innerWidth, win.innerHeight);
    var charCode = e.charCode || e.keyCode || e.which;
    if (charCode == 27){
      //   alert("Escape is not suppressed for lightbox!");
        //return false;
    }

  }

  public fullscreen(): void {
    this.pressed = !this.pressed;
    if(document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    //this.wref.localStorage [RESIZE_STORAGE] = this.pressed ? "1" : "";
    //this.doResize (this.wref.innerWidth, this.wref.innerHeight);
  }
  isPressed () {
    return Boolean(document.fullscreenElement);
  }
  ngOnInit() {
  //  this.pressed = Boolean(this.wref.localStorage [RESIZE_STORAGE]);
    this.mwm$ = this.mwmService.subscribe ((m) => {
      this.mwm = m;
      if (!this.mwm) return;
      //this.doResize (this.wref.innerWidth, this.wref.innerHeight);
    });
  }
  showFullscreen() {
    return false;
  }
  ngOnDestroy () {
    this.mwm$.unsubscribe ();
  }
  private doResize (w,h) {
    clearTimeout (this.resizeTimeout);
    if (!this.pressed && !this.mwm) return;
    this.resizeTimeout = setTimeout (() => {
      this.geom.send ({
        width: w, 
        height: h 
      });
      this.resizeTimeout = null;
    }, 150);
  }
}
