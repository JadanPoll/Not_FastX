import { Injectable } from "@angular/core";
import { IframeService, Events, EventService, EventConfig } from "../iframe";

export function settingsServiceFactory (config: SettingsConfig) {
  return new SettingsService (config);
}
export function settingsConfigFactory (is: IframeService) {
  return new SettingsConfig (is);
}
@Injectable ()
export class SettingsConfig extends EventConfig{
  valid (d) {
    return (d.msg === Events.SETTINGS_UPDATE);
  }
  readonly msg = Events.SETTINGS_UPDATE;
}

@Injectable ()
export class SettingsService extends EventService { }
