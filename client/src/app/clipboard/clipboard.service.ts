import { Injectable } from '@angular/core';
import { ClipboardService as ClipService } from "../starnet";
import { WindowRef } from '@Common/browser';
@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  constructor(
      private wref: WindowRef,
      private clip: ClipService) { }
  process(d) {
    console.log('CLIP PROCESS', d)
  }
  send(m: string, data: any) {
    this.wref.frames[0].postMessage({
      msg: m,
      body: data
    }, '*');
  }
 
  
}
