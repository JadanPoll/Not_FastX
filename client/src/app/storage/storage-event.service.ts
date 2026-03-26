import { Injectable, Injector } from '@angular/core';
import { EventService, EventConfig  } from '../starnet/iframe/event.service';
import { IframeService } from "../starnet/iframe/iframe.service"
import { StorageService } from "./storage.service";
import { ReplaySubject, Observable } from "rxjs";

export function storageEventServiceFactory (config: StorageEventConfig): StorageEventService {
  return new StorageEventService (config);
}

@Injectable()
export class StorageEventService extends EventService {
  config: StorageEventConfig;
  storage$ = new ReplaySubject <any> (1);
  constructor (config: EventConfig) {
    super (config);
    this.config = config as StorageEventConfig;
    super.getSubject ().subscribe (this.handleFrame.bind (this));
    if (!this.config.storage.has (this.config.storeId)) return;
    this.storage$.next (this.config.storage.get (this.config.storeId));
  }
  current() {
    return this.config.storage.get (this.config.storeId)
  }
  getSubject () {
    return this.storage$.asObservable ();
  }
  send (data) {
    this.config.storage.set (this.config.storeId, data);
    this.storage$.next (data);
    super.send (data);
  }
  private handleFrame (d) {
    if (d.msg !== this.config.msg) return;
    this.storage$.next (d.body);
  }
}
@Injectable ()
export class StorageEventConfig extends EventConfig {
  readonly storeId;
  constructor (public storage: StorageService, frame: IframeService) {
    super (frame);
  }
}