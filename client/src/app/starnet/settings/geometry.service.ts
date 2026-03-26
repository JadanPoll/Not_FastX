import { Injectable } from "@angular/core";
import { IframeService, Events, EventService, EventConfig } from "../iframe";
import { SETTING } from "./constants";

export function geometryServiceFactory (config: GeometryConfig) {
  return new GeometryService (config);
}
export function geometryConfigFactory (is: IframeService) {
  return new GeometryConfig (is);
}

@Injectable ()
export class GeometryService  extends EventService { }
@Injectable ()
export class GeometryConfig extends EventConfig {
  old = {};
  valid (d) {
      if (d.msg !== Events.SETTINGS_UPDATE) return;
      if (!this.old) {
        this.old = d.body [SETTING.GEOMETRY];
        return true;
      }
      for (let i in d.body [SETTING.GEOMETRY]) {
        if (this.old [i] !== d.body [SETTING.GEOMETRY]) return true;
      }
      this.old = d.body [SETTING.GEOMETRY];
      return true;
  }
  readonly msg  = Events.SETTINGS_GEOMETRY;
  process (d) {
    return d [SETTING.GEOMETRY];
  }
}