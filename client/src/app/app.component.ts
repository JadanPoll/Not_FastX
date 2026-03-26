import { Component, OnInit, OnDestroy, ViewContainerRef, ComponentFactoryResolver, HostListener, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SettingsService, IframeService, CapabilitiesService, ClientCommService } from './starnet';
import { MenuComponent } from './menu/menu.component';
import { StorageService } from './storage';
import { ConfigService } from '@Common/config';
import { WindowRef } from '@Common/browser';
import { loadTheme } from '@Common/page/ui/util';
import { NotifyService } from "@Common/notify";
import { ClientCommService as ClientCommProcessor } from "./clientcomm";
import {NgbModalConfig, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '@Common/user';
import { DEFAULT_SETTINGS  } from './constants';
import { SetupService } from '@Common/page';
import { FxStartMenuService } from './clientcomm/fx-start-menu.service';
import { LocalResizeService } from './local-settings/local-resize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FastX -- StarNet Communications';
  sub$;
  disconnect$;
  config$;
  cc$;
  menu;
  config;
  appliedMenu;
  @ViewChild('terminate') terminateDialog;
  public constructor (private titleService: Title,
    private settings: SettingsService, 
    private vcr: ViewContainerRef, 
    private cfr: ComponentFactoryResolver,
    private storage: StorageService,
    private cs: ConfigService,
    private iframe: IframeService,
    private caps: CapabilitiesService,
    private clientcomm: ClientCommService,
    private clientcommProcess: ClientCommProcessor,
    private ns: NotifyService,
    private modalConfig: NgbModalConfig,
    private modalService: NgbModal,
    private startMenuService: FxStartMenuService,
  private wref: WindowRef,
  private us: UserService,
  private route: ActivatedRoute,
  private ss: SetupService,
  private resizeService: LocalResizeService 
  ) {
    this.modalConfig.animation = false;
  }

  ngOnInit () {
    this.titleService.setTitle (this.title);
    
    this.sub$ = this.settings.getSubject ().subscribe (this.onSettingsUpdate.bind (this));
    this.config$ = this.cs.subscribe (d => {
      this.config = d;
      this.changeBody (d);
      this.updateMenu (this.config);
      if (this.config.stopPropagation) return;
      this.wref.addEventListener('message' ,e => {
        this.onWindowMessage(e)
      });
    });
    this.cc$ = this.clientcomm.getSubject().subscribe(this.onClientComm.bind(this));
    loadTheme ('../theme/theme.css');
    this.ss.load();

   
    this.wref.addEventListener('message', function cb(evt) {
      if(evt.data.msg !== 'fastx@starnet.com-ready')
        return;
      console.log('FastX extensions loaded:', ...evt.data.body.extensions);
    });



    this.wref.addEventListener('message', (evt) => {
      if(evt.data.msg !== 'fxLogoutRequest')
        return;
        this.modalService.open(this.terminateDialog).result.then(()=> {
          // terminate Session
          this.startMenuService.terminate();      
        })
        .catch(e => {
          // cancel 
        })
    });
    this.wref.addEventListener('message', (evt) => {
      if(evt.data.msg !== 'fxExecRequest')
        return;
        this.startMenuService.exec(evt.data.body.command);    
    });
      

    this.wref.postMessage({
      msg: 'fastx@starnet.com',
      body: {
        clipboard: true,
        keyboard: true
      }
    }, '*');

    
  }
  ngOnDestroy () {
    this.sub$.unsubscribe ();
    this.config$.unsubscribe ();
  }
  private onClientComm(d) {
    this.clientcommProcess.process(d);
  }
  private onSettingsUpdate (d) {
    this [this.appliedMenu ? 'onUpdate' : 'onFirstUpdate'] (d); 
  }
  private updateMenu (config) {
    if (!this.menu) return;
    this.menu.config = config;
  }
  private createMenu (d) {
    if(!this.config) return;
    this.appliedMenu = true;
    if (this.config.ui && this.config.ui.disableMenu) {
     
      return;
    }
    const factory = this.cfr.resolveComponentFactory (MenuComponent);
    this.menu = this.vcr.createComponent (factory);
    //todo show buttons based on what is in the component
    this.menu.instance.config = this.config;
    this.menu.changeDetectorRef.detectChanges();
  }
  private loadSettingsFromStorage () {
    let settings = {};
    Object.assign(settings,  DEFAULT_SETTINGS,  this.config.settings || {}, this.storage.get ('settings') || {});
    settings [6] = { current: 2 }; //explicitly set the frame window to 2
    if (!settings [2] || !settings [2].width || ! settings [2].height) {
      settings [2] = { width: window.innerWidth, height: window.innerHeight };
    }
    this.resizeService.send({ width: settings[2].width, height: settings[2].height, zoom: this.wref.localStorage['resize'] });

    
    if(! ('ImageBitmap' in window) || !('createImageBitmap' in window) ) {
      //if imagebitmap is missing fallback to pure rfx
      settings[7] = { codecId: 2}; //small block
      settings[8] = { codecId: 2}; //big block
    }
    
  
    

    let kbType = (navigator.appVersion.indexOf('Mac') != -1 ) ? 0x00000008 : 0x00000004;
    if(settings[1]) {
      settings[1].type = kbType;
    } else {
      settings[1] = {
        type: kbType,
        layout: 0x00000409
      };
    }
    this.settings.send (settings);
   
  }
  private onFirstUpdate (d) {
    this.createMenu (d);
    this.loadSettingsFromStorage ();
  }
  private onUpdate (d) {
    this.storage.set ('settings', d); 
  }
  changeBody (d) {
    if (d.hideBackground) return;
    this.wref.document.body.classList.add ('body');

  }
  private onWindowMessage (e) {
    if (e.data.parent) {
      return this.iframe.send(e.data.msg, e.data.body);
    }
    if(!e.data.fastx) {
      e.data.fastx = true;
      e.stopPropagation();
      if(this.wref.top === this.wref.parent)
        return; //found the top level window, we are done
      return this.wref.parent.postMessage(e.data, '*');
    }

  }

}
