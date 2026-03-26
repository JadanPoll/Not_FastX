import { Injectable } from "@angular/core";
import { IframeService, Events, EventService, EventConfig } from "../iframe";
import { SETTING } from "./constants";

export function frameWindowServiceFactory (config: FrameWindowConfig) {
  return new FrameWindowService (config);
}
export function frameWindowConfigFactory (is: IframeService) {
  return new FrameWindowConfig (is);
}
@Injectable ()
export class FrameWindowService  extends EventService {}
@Injectable ()
export class FrameWindowConfig extends EventConfig {
  valid (d) { 
    if (d.msg !== Events.SETTINGS_UPDATE) return;
    return d.body [SETTING.FRAME_WINDOW]; 
  }
  readonly msg = Events.SETTINGS_FRAME_WINDOW;
  process (d) {
    return d [SETTING.FRAME_WINDOW];
  }
}