import { Injectable } from "@angular/core";
import { EventService, EventConfig, eventServiceFactory, Events, IframeService } from './iframe';

export function errorServiceFactory (ec: ErrorConfig) {
  return new ErrorService (ec);
}
export function errorConfigFactory (is: IframeService) {
  return new ErrorConfig (is);
}

@Injectable ()
export class ErrorService  extends EventService {
  error (e) {
    this.sub$.next ({ msg: Events.ERROR, body: e });
  }
}

@Injectable ()
export class ErrorConfig extends EventConfig {
  valid (d) {
    return (d.msg === Events.ERROR);
  }
  readonly msg = Events.ERROR;
}
