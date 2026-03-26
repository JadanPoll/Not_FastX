import { Injectable } from '@angular/core';
import { IframeService, SnMessage, EventService, EventConfig, Events } from '../iframe';
import { BehaviorSubject, Observable } from "rxjs";

export function noneServiceFactory (config: NoneConfig) {
  return new NoneService (config);
}
export function noneConfigFactory (is: IframeService) {
  return new NoneConfig (is);
}

@Injectable()
export class NoneService extends EventService {}
@Injectable ()
export class NoneConfig extends EventConfig {
  valid (d) {
    return [Events.SECURITY_NONE].indexOf (d.msg) >= 0;
  }
  readonly msg = Events.SECURITY_NONE;
}
