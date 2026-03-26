import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { GeometryService  } from "../../../starnet/settings/geometry.service";
import { WindowRef } from '@Common/browser';
import { MwmService } from '../../../mwm.service';
import { IframeService } from '../../../starnet';
import { LocalResizeService } from '../../../local-settings/local-resize.service';
import * as C from "./constants";
import { ScreenService } from 'client/src/app/screen';

const RESIZE_STORAGE = 'resize';
// const RESIZE_STORAGE_ZOOM = 'resize-zoom';

@Component({
  selector: 'app-resize',
  templateUrl: './resize.component.html',
  styleUrls: ['./resize.component.scss']
})
export class ResizeComponent implements OnInit {
  @Output() onUpdate = new EventEmitter();
  constructor(private geom: GeometryService, 
    private wref: WindowRef, 
    private mwmService: MwmService,
    private frame: IframeService,
    private localResize: LocalResizeService,
    private screenService: ScreenService,


    private modalService: NgbModal,
    private fb: FormBuilder) { }
  pressed;
  resizeTimeout;
  mwm$;
  mwm;
  mmWidth = 1;
  mmHeight = 1;
  form$;
  form: FormGroup;
  RESIZE_FIT = 'fit';
  RESIZE_ZOOM = 'zoom';
  RESIZE_OFF = 'off';
  geoms = [
    { name: 'Window: Set resolution to size of client window', value: this.RESIZE_FIT }, 
    { name: 'Server: Keep current resolution of the server', value: this.RESIZE_OFF }]
    .concat(C.SCREEN_SIZES.map(c => { return { name: c, value: c }}));
  geometry = this.geoms[0].value;
  zoom = this.RESIZE_OFF;

  public resize (): void {
    this.pressed = !this.pressed;
    this.wref.localStorage [RESIZE_STORAGE] = this.pressed ? this.RESIZE_FIT : this.RESIZE_OFF;
    // this.doResize (this.wref.innerWidth, this.wref.innerHeight, this.wref.innerWidth / this.mmWidth, this.wref.innerHeight / this.mmHeight );
  }
  isPressed () {
    return this.pressed;
  }
  ngAfterViewInit() {
    let div = document.createElement('div');
    div.style.width = '100mm';
    div.style.height = '100mm'
    document.body.appendChild(div);
  
    var rect = div.getBoundingClientRect();
    document.body.removeChild(div);
    this.mmWidth = rect.width / 100;
    this.mmHeight = rect.height / 100;

    this.pressed = Boolean(this.wref.localStorage [RESIZE_STORAGE] == this.RESIZE_FIT);
    this.mwm$ = this.mwmService.subscribe ((m) => {
      this.mwm = m;
      if (!this.mwm) return;
    });
  }
  ngOnInit() {
    let size = this.frame.size();
    this.geometry = this.wref.localStorage[RESIZE_STORAGE] || this.RESIZE_FIT;
    this.onUpdate.emit(this.geometry);
  }
  updateGeometry() {
    this.onUpdate.emit(this.geometry);
   
    if(this.geometry === this.RESIZE_FIT) {
      this.wref.localStorage [RESIZE_STORAGE] =  this.RESIZE_FIT;
      this.geom.send({ width: window.innerWidth, height: window.innerHeight });
      this.localResize.send({ width: window.innerWidth, height: window.innerHeight });
      return;
    } else {
      this.wref.localStorage [RESIZE_STORAGE] =  this.RESIZE_OFF;
      if(this.geometry === this.RESIZE_OFF) {
        return;
      }
      let g = this.getGeom();
      if(!g) { 
        return;
      }
      this.geom.send(g);
    }
  }
  private getGeom() {
    let g = this.geometry.split('x');
      this.wref.localStorage [RESIZE_STORAGE] =  this.RESIZE_OFF;
    
    if(g.length !== 2)
      return;

    return { width: parseInt(g[0], 10), height: parseInt(g[1], 10) };

  }
  ngOnDestroy () {
    this.mwm$.unsubscribe ();
  }
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.frame.focus ();
     }, (reason) => {
      this.frame.focus ();
     });
  }

}
