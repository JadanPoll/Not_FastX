import { Injectable } from "@angular/core";
import {  Events, IframeService } from "../starnet";
import { StorageEventConfig, StorageEventService, StorageService } from "../storage";
import { LOCALSETTINGS, LOCAL_SETTINGS_IGNORE_FRAME} from "./constants";
import { WindowRef } from "@Common/browser";

export function localResizeServiceFactory (config: LocalResizeConfig) {
  return new LocalResizeService (config);
}
export function localResizeConfigFactory (wref: WindowRef, store: StorageService, is: IframeService) {
  return new LocalResizeConfig (wref,store, is);
}

@Injectable ()
export class LocalResizeService  extends StorageEventService {
  resizeCanvas(data) {
    this.config.frame.send(Events.LOCAL_SETTINGS_RESIZE_CANVAS, data)
  }
}
@Injectable ()
export class LocalResizeConfig extends StorageEventConfig {
  storeId = Events.LOCAL_SETTINGS_RESIZE;
  readonly msg = Events.LOCAL_SETTINGS_RESIZE;
 //s readonly enabled;
  constructor (wref: WindowRef, store: StorageService, frame: IframeService) {
    super (store, frame);
   // this.enabled = wref.hasOwnProperty ('WebAssembly');
  }
}