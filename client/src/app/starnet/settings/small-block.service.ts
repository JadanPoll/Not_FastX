import { Injectable } from "@angular/core";
import { IframeService, Events, EventService, EventConfig } from "../iframe";
import { SETTING } from "./constants";

export function smallBlockServiceFactory (config: SmallBlockConfig) {
  return new SmallBlockService (config);
}
export function smallBlockConfigFactory (is: IframeService) {
  return new SmallBlockConfig (is);
}

@Injectable ()
export class SmallBlockService  extends EventService {}
@Injectable ()
export class SmallBlockConfig extends EventConfig {
  valid (d) { 
    if (d.msg !== Events.SETTINGS_UPDATE) return;
    return d.body [SETTING.SMALL_BLOCK_IMAGE_FORMAT]; 
  }
  readonly msg = Events.SETTINGS_SMALL_BLOCK_IMAGE_FORMAT;
  process (d) {
    return d [SETTING.SMALL_BLOCK_IMAGE_FORMAT];
  }
}