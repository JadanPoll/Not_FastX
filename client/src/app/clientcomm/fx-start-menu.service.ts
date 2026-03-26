import { Injectable } from '@angular/core';
import { WindowRef } from '@Common/browser';

import { SendService } from './send.service';

const FX_START_MENU = 'fx-start-menu';

@Injectable({
  providedIn: 'root'
})
export class FxStartMenuService {
  i = 0;
  constructor(
    private sendService: SendService,
    private wref: WindowRef) { }
  process(d) {
    
  }
  hello() {
    this.sendService.send(FX_START_MENU, {
        messageNumber: ++this.i,
        data: JSON.stringify({
          method: "hello",
          params: {}
        })
      });
  }
  exec(command) {
    this.sendService.send(FX_START_MENU, {
      messageNumber: ++this.i,
      data: JSON.stringify({
        method: 'exec',
        params: {
          command: command
        }
      }), 
    });
  }
  terminate() {
    this.sendService.send(FX_START_MENU, {
      messageNumber: ++this.i,
      data: JSON.stringify({
        method: 'terminate',
        params:  { message: 'Terminated from start menu' }
      }), 
    });
  }
}  
