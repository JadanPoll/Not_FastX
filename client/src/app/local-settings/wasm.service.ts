import { Injectable } from "@angular/core";
import {  Events, IframeService } from "../starnet";
import { StorageEventConfig, StorageEventService, StorageService } from "../storage";
import { LOCALSETTINGS, LOCAL_SETTINGS_WASM} from "./constants";
import { WindowRef } from "@Common/browser";

export function wasmServiceFactory (config: WasmConfig) {
  return new WasmService (config);
}
export function wasmConfigFactory (wref: WindowRef, store: StorageService, is: IframeService) {
  return new WasmConfig (wref,store, is);
}

@Injectable ()
export class WasmService  extends StorageEventService {}
@Injectable ()
export class WasmConfig extends StorageEventConfig {
  storeId = Events.LOCAL_SETTINGS_WASM;
  readonly msg = Events.LOCAL_SETTINGS_WASM;
  readonly enabled;
  constructor (wref: WindowRef, store: StorageService, frame: IframeService) {
    super (store, frame);
    this.enabled = wref.hasOwnProperty ('WebAssembly');
  }
}