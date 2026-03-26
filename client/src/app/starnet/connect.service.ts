import { Injectable } from "@angular/core";
import { EventService, EventConfig, eventServiceFactory, Events, IframeService } from './iframe';

export function connectServiceFactory (c: ConnectConfig) {
  return new ConnectService (c);
}
export function connectConfigFactory (is: IframeService) {
  return new ConnectConfig (is);
}

@Injectable ()
export class ConnectService  extends EventService {}

@Injectable ()
export class ConnectConfig extends EventConfig {
  valid (d) {
    return (d.msg === Events.CONNECT);
  }
  readonly msg = Events.CONNECT;
}
