import { Injectable } from "@angular/core";
import { IframeService, Events, EventService, EventConfig } from "../iframe";
import { SETTING } from "./constants";

export function networkAutodetectServiceFactory (config: NetworkAutodetectConfig) {
  return new NetworkAutodetectService (config);
}
export function networkAutodetectConfigFactory (is: IframeService) {
  return new NetworkAutodetectConfig (is);
}
@Injectable ()
export class NetworkAutodetectService  extends EventService {}
@Injectable ()
export class NetworkAutodetectConfig extends EventConfig {
  valid (d) { 
    if (d.msg !== Events.SETTINGS_UPDATE) return;
    return d.body [SETTING.NETWORK_AUTODETECT]; 
  }
  readonly msg = Events.SETTINGS_NETWORK_AUTODETECT;
  process (d) {
    return d [SETTING.NETWORK_AUTODETECT];
  }
}