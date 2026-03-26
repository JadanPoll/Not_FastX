import { Injectable } from "@angular/core";
import { IframeService, Events, EventService, EventConfig } from "../iframe";
import { SETTING } from "./constants";

export function frameRateServiceFactory (config: FrameRateConfig) {
  return new FrameRateService (config);
}
export function frameRateConfigFactory (is: IframeService) {
  return new FrameRateConfig (is);
}

@Injectable ()
export class FrameRateService  extends EventService {}
@Injectable ()
export class FrameRateConfig extends EventConfig {
  valid (d) { 
    if (d.msg !== Events.SETTINGS_UPDATE) return;
    return d.body [SETTING.FRAME_RATE]; 
  }
  readonly msg = Events.SETTINGS_FRAME_RATE;
  process (d) {
    return d [SETTING.FRAME_RATE];
  }
}