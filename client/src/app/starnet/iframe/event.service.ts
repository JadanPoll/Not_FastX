import { Injectable } from '@angular/core';
import { IframeService, SnMessage } from './iframe.service';
import { ReplaySubject, Observable } from "rxjs";
import { Events } from "./constants";

export function eventServiceFactory (config: EventConfig) {
  return new EventService (config);
}

@Injectable () 
export class EventConfig {
  constructor (public frame: IframeService) {}
  valid (d):any { 
    return; 
  }
  msg: Events
  defaults = {};
  process (d) { return d; }
}

@Injectable()
export class EventService {
  config: EventConfig
  private frame$;
  protected sub$ = new ReplaySubject <any> (1);
  constructor(config: EventConfig) {
    this.config = config;
    this.frame$ = this.config.frame.getSubject ().subscribe (d => {
      if (!this.config.valid (d)) return;
      this.sub$.next (this.config.process (d.body));
    });
  }
  get (name: string) {
    return this.config [name];
  }
  getSubject (): Observable<SnMessage> {
    return this.sub$.asObservable ();
  }
  send (data) {
  //  this.sub$.next(this.config.msg)
    this.config.frame.send (this.config.msg, data)
  }
}
