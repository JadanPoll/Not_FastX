import { Injectable } from "@angular/core";
import { EventService, EventConfig, eventServiceFactory, Events, IframeService } from './iframe';

export function disconnectServiceFactory (dc: DisconnectConfig) {
  return new DisconnectService (dc);
}
export function disconnectConfigFactory (is: IframeService) {
  return new DisconnectConfig (is);
}
@Injectable ()
export class DisconnectService  extends EventService {}

@Injectable ()
export class DisconnectConfig extends EventConfig {
  valid (d) {
    return (d.msg === Events.DISCONNECT);
  }
  readonly msg = Events.DISCONNECT;
}
