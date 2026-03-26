import { Injectable } from "@angular/core";
import { IframeService, Events, EventService, EventConfig } from "../iframe";
import { SETTING } from "./constants";

export function compressionServiceFactory (config: CompressionConfig) {
  return new CompressionService (config);
}
export function compressionConfigFactory (is: IframeService) {
  return new CompressionConfig (is);
}
@Injectable ()
export class CompressionService  extends EventService {}
@Injectable ()
export class CompressionConfig extends EventConfig {
  valid (d) {
    if (d.msg !== Events.SETTINGS_UPDATE) return;
    return d.body [SETTING.COMPRESSION];
  }
  readonly msg = Events.SETTINGS_COMPRESSION;
  process (d) {
    return d [SETTING.COMPRESSION];
  }
}
