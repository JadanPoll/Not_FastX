import { Injectable } from "@angular/core";
import { IframeService, Events, EventService, EventConfig } from "../iframe";
import { SETTING } from "./constants";

export function highQualityUpgradesServiceFactory (config: HighQualityUpgradesConfig) {
  return new HighQualityUpgradesService (config);
}
export function highQualityUpgradesConfigFactory (is: IframeService) {
  return new HighQualityUpgradesConfig (is);
}
@Injectable ()
export class HighQualityUpgradesService  extends EventService {}
@Injectable ()
export class HighQualityUpgradesConfig extends EventConfig {
  valid (d) { 
    if (d.msg !== Events.SETTINGS_UPDATE) return;
    return d.body [SETTING.HIGH_QUALITY_UPGRADES]; 
  }
  readonly msg = Events.SETTINGS_HIGH_QUALITY_UPGRADES;
  process (d) {
    return d [SETTING.HIGH_QUALITY_UPGRADES];
  }
}