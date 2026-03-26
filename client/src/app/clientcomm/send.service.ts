import { Injectable } from '@angular/core';

import { WindowRef } from '@Common/browser';



@Injectable({
  providedIn: 'root'
})
export class SendService {
  constructor(
    private wref: WindowRef) { 
 
    }
  comDebug = false;
  setDebug(b) {
    this.comDebug = b;
  }
  send(m: string, data: any) {
    if(this.comDebug) {
      console.log('COM DEBUG SEND', m, data);
    }
    this.wref.frames[0].postMessage({
      msg: m,
      body: data
    }, '*');
  }
  nack(m: string, data: any) {
    if(this.comDebug) {
      console.log('COM DEBUG NACK', m, data);
    }
    this.wref.frames[0].postMessage({
      msg: m,
      nack: true,
      body: data
    }, '*');
  }
  
  
  
}
