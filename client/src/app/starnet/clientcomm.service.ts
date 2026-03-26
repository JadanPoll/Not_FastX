import { Injectable } from "@angular/core";
import { IframeService, Events, EventService, EventConfig } from "./iframe";

export function clientCommServiceFactory (config: ClientCommConfig) {
  return new ClientCommService (config);
}
export function clientCommConfigFactory (is: IframeService) {
  return new ClientCommConfig (is);
}

@Injectable ()
export class ClientCommService  extends EventService {}
@Injectable ()
export class ClientCommConfig extends EventConfig {
  valid (d) { 
    if (d.msg !== Events.CLIENTCOMM) return;
    return d.body; 
  }
  readonly msg = Events.CLIENTCOMM;
  process (d) {
    return d;
  }
}