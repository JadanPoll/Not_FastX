import { Injectable } from '@angular/core';
import { IframeService, SnMessage, EventService, EventConfig, Events } from '../iframe';
import { BehaviorSubject, Observable } from "rxjs";

export function passwordServiceFactory (config: PasswordConfig) {
  return new PasswordService (config);
}
export function passwordConfigFactory (is: IframeService) {
  return new PasswordConfig (is);
}
@Injectable()
export class PasswordService extends EventService {}
@Injectable ()
export class PasswordConfig extends EventConfig {
  valid (d) {
    return [Events.SECURITY_PASSWORD].indexOf (d.msg) >= 0;
  }
  readonly msg = Events.SECURITY_PASSWORD;
}
