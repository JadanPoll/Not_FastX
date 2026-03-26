import { Injectable } from "@angular/core";
import { IframeService, Events, EventService, EventConfig } from "../iframe";
import { SETTING } from "./constants";

export function bigBlockServiceFactory (config: BigBlockConfig) {
  return new BigBlockService (config);
}
export function bigBlockConfigFactory (is: IframeService) {
  return new BigBlockConfig (is);
}

@Injectable ()
export class BigBlockService  extends EventService {}
@Injectable ()
export class BigBlockConfig extends EventConfig {
  valid (d) { 
    if (d.msg !== Events.SETTINGS_UPDATE) return;
    return d.body [SETTING.BIG_BLOCK_IMAGE_FORMAT]; 
  }
  readonly msg = Events.SETTINGS_BIG_BLOCK_IMAGE_FORMAT;
  process (d) {
    return d [SETTING.BIG_BLOCK_IMAGE_FORMAT];
  }
}