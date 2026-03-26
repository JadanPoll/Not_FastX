import { Injectable } from "@angular/core";
import { EventService, EventConfig, eventServiceFactory, Events, IframeService, CAP } from './iframe';

export function capabilitiesServiceFactory (dc: CapabilitiesConfig) {
  return new CapabilitiesService (dc);
}
export function capabilitiesConfigFactory (is: IframeService) {
  return new CapabilitiesConfig (is);
}
@Injectable ()
export class CapabilitiesService  extends EventService {}

@Injectable ()
export class CapabilitiesConfig extends EventConfig {
  valid (d) {
    return (d.msg === Events.CAPABILITIES);
  }
  readonly msg = Events.CAPABILITIES;
}
