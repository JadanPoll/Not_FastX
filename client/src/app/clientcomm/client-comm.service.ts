import { Injectable } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { NotifyService } from '@Common/notify';
import { WindowRef } from '@Common/browser';
import { ExternalUrlService } from '@Common/util';
import { ClientCommService as ClientCommSender } from "../starnet";
import { FxShareService } from './share/fx-share.service';
import { SendService } from './send.service';
import { FxUrlService } from './fx-url.service';
import { FxNotifyService } from './fx-notify.service';
import { FxStartMenuService } from './fx-start-menu.service';


@Injectable({
  providedIn: 'root'
})
export class ClientCommService {
  private comDebug;
  constructor(
    private route: ActivatedRoute ,
    private ns: NotifyService,
    private sendService: SendService,
    private wref: WindowRef,
    private shareService: FxShareService,
    private urlService: FxUrlService,
    private startMenuService: FxStartMenuService,
    private notifyService: FxNotifyService) { 
 
    }
  process(d) {
    switch(d.type) {
      case 'fx-notify':
        this.notifyService.process(d);
        break;
      case 'fx-url':
        this.urlService.process(d);
      case 'fx-share':
        this.shareService.process(d);
        break;
      case 'fx-start-menu':
        this.startMenuService.process(d);
        break; 
      default:
        this.wref.parent.postMessage(d, '*');
    }
    if(!this.comDebug) 
      return;
    
    try {
      
      let data = new TextDecoder("utf-8").decode(d.data);
      let json = JSON.parse(data);
      console.log('COM DEBUG: DECODED JSON', d, json);
    } catch(e) {
      console.log('COM DEBUG: RAW', d); 
    }
  }
  setDebug(b) {
    this.comDebug = b;
    this.sendService.setDebug(this.comDebug);
  }
  send(m: string, data: any) {
   
    this.sendService.send(m, data);
  }
}
