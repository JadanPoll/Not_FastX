import { Injectable } from "@angular/core";
import { IframeService, Events, EventService, EventConfig } from "../iframe";
import { SETTING } from "./constants";

export function bigBlockSizeServiceFactory (config: BigBlockSizeConfig) {
  return new BigBlockSizeService (config);
}
export function bigBlockSizeConfigFactory (is: IframeService) {
  return new BigBlockSizeConfig (is);
}

@Injectable ()
export class BigBlockSizeService  extends EventService {}
@Injectable ()
export class BigBlockSizeConfig extends EventConfig {
  valid (d) { 
    if (d.msg !== Events.SETTINGS_UPDATE) return;
    return d.body [SETTING.BIG_BLOCK_MINIMUM_SIZE]; 
  }
  readonly msg = Events.SETTINGS_BIG_BLOCK_SIZE;
  process (d) {
    return d [SETTING.BIG_BLOCK_MINIMUM_SIZE];
  }
}