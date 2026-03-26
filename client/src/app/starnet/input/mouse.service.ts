import { Injectable } from "@angular/core";
import { IframeService, Events, EventService, EventConfig } from "../iframe";


export function MouseInputServiceFactory (config: MouseInputConfig) {
  return new MouseInputService (config);
}
export function MouseInputConfigFactory (is: IframeService) {
  return new MouseInputConfig (is);
}

@Injectable ()
export class MouseInputService  extends EventService {
  public down (body) {
		this.config.frame.send ('mouse.down',  body );
	}
	public up (body) {
		this.config.frame.send ('mouse.up', body);
  }
  public move (body) {
		this.config.frame.send ('mouse.move',  body );
	}
	public wheel (body) {
		this.config.frame.send ('mouse.wheel', body);
  }
  public setButton (body) {
    this.config.frame.send ('mouse.setMouseButton', body);
  }
  
}
@Injectable ()
export class MouseInputConfig extends EventConfig {
  valid (d) { 
      return;
  }
  readonly msg = Events.SETTINGS_FRAME_RATE;
  process (d) {
   return;
  }
}