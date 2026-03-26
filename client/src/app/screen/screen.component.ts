import { Component, OnInit, ElementRef, HostListener, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IframeService, GeometryService } from "../starnet";
// import { paramsServiceFactory } from '@Common/session/actions';
import { CloseService } from "../close.service";
import { ConnectService } from "../connect";
import { ConfigService } from "@Common/config";
import { IgnoreFrameService, WasmService } from "../local-settings";
import { SecurityConfigService } from '../secuity.service';
import { Session } from "@Common/api/session";
import { Share } from "@Common/api/share";
import { NoLogin } from "@Common/api/nologin";

import { TouchMouseService } from '../input';
import { TouchService } from './touch.service';
import { MwmService } from '../mwm.service';
import { ScalingComponent } from '../menu/settings/scaling/scaling.component';
import { ScalingService } from '../starnet/settings/scaling.service';
import { UserService } from '@Common/user';
import { FxShareService } from '../clientcomm/share/fx-share.service';
import {  LocalResizeService } from '../local-settings/local-resize.service';
import { ScreenService, METHODS } from './screen.service';


const SCROLL_WIDTH = 10;

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss'],
})
export class ScreenComponent implements OnInit {
  private sub$;
  private resize$;
  private scale$;
  id: string;
  config$;
  configSec$;
  scrollTimer;
  resizeTimer;
  mwmTimer;
  mwm;
  mwm$;
  touch;
  scaler :any;
  noty;
  size = { width: 0, height: 0 };
  shareServerData$;
  clientNotify$;
  lobby;
  shareMe = {} as any;
  meNotify$;
  screenService$;
  loaded;
  constructor(private elem: ElementRef, 
    private route: ActivatedRoute, 
    private conn: ConnectService, 
    private frame: IframeService,
    private geom: GeometryService,
    private localResize: LocalResizeService,
    private scale: ScalingService,
    private cs: ConfigService,
    private close: CloseService,
    private ws: WasmService,
    private ignoreFrame: IgnoreFrameService,
    private sec: SecurityConfigService,
    private cdr: ChangeDetectorRef,
    private t: TouchMouseService,
    private ts: TouchService,
    private us: UserService,
    private mwmService: MwmService,
    private ss: FxShareService,
    private screenService: ScreenService
    ) {

     }
     @HostListener('window:click', ['$event']) async doclick(event) {
      switch (this.route.snapshot.routeConfig.path) {
        case 'connect': 
          return await this.us.keepalive();
      }
    }
    @HostListener('window:keydown', ['$event']) async dokey(event) {
      switch (this.route.snapshot.routeConfig.path) {
        case 'connect': 
          return await this.us.keepalive();
      }
    }
  @ViewChild ("scroll", {static: false}) scroll;

  @HostListener ("window:focus") onFocus () {
      if (this.frame) this.frame.focus ();
  }
  @HostListener ("window:resize") handleWindowResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      if(this.mwm || this.isFit()) {     
        this.geom.send({ width: window.innerWidth, height: window.innerHeight });
      } else {
        this.screenService.refresh();
      }
  
    }, 150);  
    
  }
  ngOnInit() {
    this.load ();
   
    let ts = this.ts.subscribe ((t) => {
      this.touch = t;
      ts.unsubscribe ();
    });
    document.ontouchmove = function(event){
        event.preventDefault();
    }
 
    this.mwm$ = this.mwmService.subscribe ((m) => {
      this.mwm = m;
      if (!this.mwm) return;
      this.frame.resize({ width: window.innerWidth, height: window.innerHeight });
      this.scroll.nativeElement.classList.remove ('scroll');
    });
    this.meNotify$ = this.ss.me.subscribe(d => {
      this.shareMe = d;
      this.cdr.detectChanges();
    });
    // this.sec.subscribe(c => {
    //   let g = c.geometry ? c.geometry.split('x') : ((window.innerWidth / 2) + 'x' + (window.innerHeight / 2));
    //   this.frame.resize({ width: g[0], height: g[1] });
    //   // this.localResize.send({ 
    //   //   width: g[0], 
    //   //   height: g[1] 
    //   // });
    //   // this.frame.show();
    // });
    this.screenService$ = this.screenService.subscribe(async (evt) => {
      switch(evt.type) {
        case METHODS.REFRESH:
          await this.onWindowResize();
      }
    })

  }
  ngAfterViewInit () {
    this.scale$ = this.scale.getSubject().subscribe (d => {
      this.scaler = d;
      this.screenService.refresh();
      
    });
    this.resize$ = this.geom.getSubject ().subscribe ((d:any) => {
      //debounce resizing
      if((this.size.width === d.width) && (this.size.height === d.height)) {
        return;
      } 
      this.size.width = d.width;
      this.size.height = d.height;
      
      this.screenService.refresh();
    });
    let s$ = this.frame.getSubject ().subscribe (data => { 
      if(data.msg !== 'ready')
        return;
      this.loaded = true;
      // console.log('ready')
      // if(this.isFit())
      //    this.geom.send({ width: window.innerWidth, height: window.innerHeight });
      this.onWindowResize();
      s$.unsubscribe();
    });
  }
  ngOnDestroy () {
    this.resize$.unsubscribe ();
    this.mwm$.unsubscribe ();
    this.shareServerData$.unsubscribe();
    this.scale$.unsubscribe ();
    this.screenService$.unsubscribe();
    if (this.config$) this.config$.unsubscribe ();
    if (this.configSec$) this.config$.unsubscribe ();
  }
  inLobby() {
    return this.shareMe && this.shareMe.me && this.shareMe.me.status === 'lobby';
  }
  
  load () {
    let id = this.route.snapshot.params.id;
    if(this.route.snapshot.fragment) {
       try {
         id = JSON.parse(atob(this.route.snapshot.fragment)).id;
       } catch(e) {
         this.close.error(e.message);
         this.cdr.detectChanges ();
         return;
       }
    } 
    if (!id) {
      this.close.error ("Missing Session Id");
      this.cdr.detectChanges ();
      return;
    }
    this.cs.subscribe(c => {
      this.handle (c);
    });
    this.cs.loadUrl ('config?id=' +  id);
  }
  
   private async handle (config) {
     console.log ("Config Loaded", config);
     this.noty = "Basic Config Loaded";
     let d;
     try {
        d = await this.handleSecurity();
     } catch(e) {
       this.endError(e);
       return;
     }
     
    this.appendFrame (d.uri);
    let connParams = Object.assign ({},this.route.snapshot.params, {
      identifier: navigator.appVersion,
      debug: this.setDebug(this.route.snapshot.params.debug),
    });
    this.ignoreFrame.send(this.ignoreFrame.current());
    this.setWasm(this.route.snapshot.params.wasm);

   
    this.enableTouch();

    let connections = [];

    let prefix = window.location.pathname.replace (/\/client\/.*;?.+$/, d.uri);
      
    let str = 'wss://' + window.location.host + prefix;

    if(this.route.snapshot.params.wrtc) {
      connections.push({
        type: 'rtc',
        url:  ( 'wss://' + window.location.host + prefix).replace('/protocol/', '/signal/'),
        iceServers: config.stunServers || [],
      })
    }
    connections = connections.concat((d.urls || []).map(c => ({ type: 'ws', url: c })));
    str = str.replace(/\/+$/, "");
    connections.push ({
      type: 'ws',
      url: str
    });

    let done;

    let next$ = this.frame.getSubject ().subscribe ((data:any) => {
      if (data.msg !== 'nextConnection') return;
      if (!connections.length) {
        if (done) this.noty = '';
        if (done) return this.close.disconnect (data.reason || "Could not find a valid websocket url");
        done = true;
        return this.conn.connect (d.id, connParams, '');
      } 
      let url = d.urls.shift ()
      
      this.conn.connect (d.id, connParams, connections.shift());
      if(!this.conn.connection)
        return;
      this.noty = "Trying Url: " + this.conn.connection.url;
    });
    this.openDynamicChannels(d.windowMode, next$);
    this.sec.next (d);
    
    this.conn.connect (d.id, connParams, connections.shift());
    if(!this.conn.connection)
      return;
    this.noty = "Trying Url: " + this.conn.connection.url;
   
  }
   private setWasm (wasm) {
     if (!wasm) {
        return this.ws.send ({ enabled: true });
     }
     return this.ws.send ({ enabled: + wasm });
   }
   private setDebug (debug = '') {
     let d = {
       send: false,
       receive: false,
       level: debug
     };
     if (!debug) return d;
     if (debug.toLowerCase () === 'send') { d.send = true; return d; }
     if (debug.toLowerCase () === 'receive') { d.receive = true; return d; }
     d.send = true;
     d.receive = true;
     return d;
   }
  
   private async handleSecurity () {
    Session.api.setRootPath ('..');
    this.noty = 'Getting security configuration: ' + this.route.snapshot.routeConfig.path
    switch (this.route.snapshot.routeConfig.path) {
      case 'shortcut':
          return await Session.connectShortcut (this.route.snapshot.params);
      case 'connect':
          return await Session.connect (this.route.snapshot.params)
      case 'custom':
        if (!this.route.snapshot.fragment) 
          throw new Error ("Base 64 encoded parameters not found in url");

        return JSON.parse (atob (this.route.snapshot.fragment));
      case 'share':
        return await Share.connect (this.route.snapshot.params)
      case 'guest':
        return await NoLogin.shareConnect (this.route.snapshot.params)
      default:
        console.log(this.route.snapshot, this.route.snapshot.routeConfig.path);
        throw new Error ("Unknown Security method");
    }
  }
  private openDynamicChannels(windowMode, next$) {
    let s$ = this.frame.getSubject ().subscribe (data => {
      //open dynamic channels
    if (data.msg !== 'ready') return;
      this.noty = null;
      next$.unsubscribe ();
      this.frame.send ("open-channel", { name: "clipboard" });
      this.frame.send ("open-channel", { name: "clientcomm" });
      if (windowMode === "rootless") {
        this.frame.send ("open-channel", { name: "multiwindow" });
        this.mwmService.setMwm (true);
      }
      s$.unsubscribe ();
    });
  }
  private enableTouch() {
    let touch$ = this.frame.getSubject().subscribe (data => {
      if (data.msg !== 'touchenabled') return;
      this.ts.enable (true);
      touch$.unsubscribe ();
    });
  }
  private appendFrame (uri) {
    let f = this.frame.getFrame ();
    let p = window.location.pathname.replace (/\/client.*/, "");
    f.src = p  + uri;
    f.style.border = 'none';
    this.scroll.nativeElement.appendChild (f);
    f.focus ();
    this.frame.show();
  }
  async onWindowResize () {
    return this.mwm ? this.resizeMwm() : await this.resizeSwm();
  }
  resizeMwm () {
    this.frame.resize({ width: window.innerWidth, height: window.innerHeight });
    this.frame.show();
  }
  async resizeSwm() {
      if(!this.loaded)
        return;
      let  w,h, scaleX, scaleY;

      if(this.isFit()) {
        w = window.innerWidth;
        h = window.innerHeight;
        if(this.scaler.autoscale) {
          scaleY = window.innerHeight / this.size.height;
          scaleX =  (window.innerHeight / this.size.height);
        } else {
          scaleX = this.scaler.current;
          scaleY = this.scaler.current;
        } 
      } else {
      
        if(this.scaler.autoscale) {
          scaleY = window.innerHeight / this.size.height;
          scaleX =  (window.innerHeight / this.size.height);
          w = this.size.width;
          h = this.size.height;
        } else {
          w = this.size.width;
          h = this.size.height;
          scaleX = this.scaler.current;
          scaleY = this.scaler.current;
        }
      }
      this.frame.resize({ width: w * scaleX, height: h * scaleY });
      this.localResize.send({ width: w, height: h, scaleX: scaleX, scaleY: scaleY })
      
      this.updateScroll (); 
  }
  private isFit() {
    return !window.localStorage['resize'] || (window.localStorage['resize'] === 'fit');
  }
  private updateScroll (){ 
      let w = window.innerWidth;
      let h = window.innerHeight;
      this.scroll.nativeElement.style.width = w + 'px';
      this.scroll.nativeElement.style.height = h +  'px';
      let f = this.frame.getFrame();
   
    
      if((parseInt(f.style.width.slice(0, -2), 10) > w )) {
        this.scroll.nativeElement.style.overflowX = 'scroll';
        this.scroll.nativeElement.classList.remove('d-flex');
      } else {
        this.scroll.nativeElement.style.overflowX = 'auto';
        this.scroll.nativeElement.classList.add('d-flex');
      }
      this.scroll.nativeElement.style.overflowY
        = ((h < this.size.height)) ? 'scroll' : 'auto';
      
      this.scrollTimer = null;
  }
  private endError (e) {
    this.noty = '';
      this.close.disconnect (e.message);
    
   
    console.log (e);
    console.log ("No Security Config Loaded");
  }

}
