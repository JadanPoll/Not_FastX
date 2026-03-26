import { Injectable } from "@angular/core";
import { IframeService, Events, EventService, EventConfig } from "../iframe";
import { LOCALSETTING } from "./constants";

export function scalingServiceFactory (config: ScalingConfig) {
  return new ScalingService (config);
}
export function scalingConfigFactory (is: IframeService) {
  return new ScalingConfig (is);
}
@Injectable ()
export class ScalingService  extends EventService {}
@Injectable ()
export class ScalingConfig extends EventConfig {
  valid (d) { 
    if (d.msg !== Events.SETTINGS_SCALING) return;
    return d.body; 
  }
  readonly msg = Events.SETTINGS_SCALING;
  process (d) {
    return d;
  }
}