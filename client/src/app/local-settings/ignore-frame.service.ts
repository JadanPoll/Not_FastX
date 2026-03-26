import { Injectable } from "@angular/core";
import {  Events, IframeService } from "../starnet";
import { StorageEventConfig, StorageEventService, StorageService } from "../storage";
import { LOCALSETTINGS, LOCAL_SETTINGS_IGNORE_FRAME} from "./constants";
import { WindowRef } from "@Common/browser";

export function ignoreFrameServiceFactory (config: IgnoreFrameConfig) {
  return new IgnoreFrameService (config);
}
export function ignoreFrameConfigFactory (wref: WindowRef, store: StorageService, is: IframeService) {
  return new IgnoreFrameConfig (wref,store, is);
}

@Injectable ()
export class IgnoreFrameService  extends StorageEventService {}
@Injectable ()
export class IgnoreFrameConfig extends StorageEventConfig {
  storeId = Events.LOCAL_SETTINGS_IGNORE_FRAME;
  readonly msg = Events.LOCAL_SETTINGS_IGNORE_FRAME;
 //s readonly enabled;
  constructor (wref: WindowRef, store: StorageService, frame: IframeService) {
    super (store, frame);
   // this.enabled = wref.hasOwnProperty ('WebAssembly');
  }
}