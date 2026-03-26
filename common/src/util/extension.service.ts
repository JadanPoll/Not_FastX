import { Injectable } from '@angular/core';
import { WindowRef } from '@Common/browser';

const ExtId = 'fastx@starnet.com'

@Injectable()
export class ExtensionService {
  isEnabled;
  constructor(
    private wref: WindowRef
    ) {
     
      
     }
  enabled() {
    return document.getElementById(ExtId)?.dataset['enabled'];
  }
  sendMessage(name, details) {
    return new Promise((resolve, reject) => {
      let el = document.getElementById(ExtId);
      if(!el)
        return reject(new Error('Missing Extension Element'));

      el.dispatchEvent(new CustomEvent(name , details));
      el.addEventListener(name + '-ready', (evt:CustomEvent) => {
        resolve(evt.detail);
      }, { once: true});
      setTimeout(() => {
        reject(new Error('Event time out'));
      }, 30000);
    })
  }
}
