import { Injectable } from '@angular/core';
import { WindowRef } from "@Common/browser";
import { StorageService } from './storage.service';

@Injectable()
export class LocalStorageService extends StorageService {
  constructor(private wref: WindowRef) { 
    super ();
  }
  get (name: string) {
    let str = this.wref.localStorage [name];
    try {
      return JSON.parse (str);
    } catch (e) {
      return str;
    }
  }
  set (name: string, value) {
    this.wref.localStorage [name] = JSON.stringify (value);
  }
  clear (name: string) {
    this.wref.localStorage [name] = '';
  }
  has (name: string) {
    return this.wref.localStorage.hasOwnProperty (name);
  }
}
