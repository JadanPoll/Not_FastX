import { Injectable } from "@angular/core";
import { IframeService, Events, EventService, EventConfig } from "./iframe";

export function clipboardServiceFactory (config: ClipboardConfig) {
  return new ClipboardService (config);
}
export function clipboardConfigFactory (is: IframeService) {
  return new ClipboardConfig (is);
}

@Injectable ()
export class ClipboardService  extends EventService {}
@Injectable ()
export class ClipboardConfig extends EventConfig {
  valid (d) { 
    if ([Events.CLIPBOARD].indexOf(d.msg) < 0) return;
    return d.body; 
  }
  readonly msg = Events.CLIPBOARD;
  process (d) {
    return d;
  }
}