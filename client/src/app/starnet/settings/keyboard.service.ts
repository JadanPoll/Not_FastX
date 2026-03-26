import { Injectable } from "@angular/core";
import { IframeService, Events, EventService, EventConfig } from "../iframe";
import { SETTING } from "./constants";

export function  keyboardServiceFactory (config: KeyboardConfig) {
  return new KeyboardService (config);
}
export function keyboardConfigFactory (is: IframeService) {
  return new KeyboardConfig (is);
}

@Injectable ()
export class KeyboardService  extends EventService { }
@Injectable ()
export class KeyboardConfig extends EventConfig {
  valid (d) {
      if (d.msg !== Events.SETTINGS_UPDATE) return;
      return d.body [SETTING.KEYBOARD];
  }
  readonly msg  = Events.SETTINGS_KEYBOARD;
  process (d) {
    return d [SETTING.KEYBOARD];
  }
}