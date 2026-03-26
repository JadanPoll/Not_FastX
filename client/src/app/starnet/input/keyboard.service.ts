import { Injectable } from "@angular/core";
import { IframeService, Events, EventService, EventConfig } from "../iframe";


export function KeyboardInputServiceFactory (config: KeyboardInputConfig) {
  return new KeyboardInputService (config);
}
export function KeyboardInputConfigFactory (is: IframeService) {
  return new KeyboardInputConfig (is);
}

@Injectable ()
export class KeyboardInputService  extends EventService {
  public down (body) {
		this.config.frame.send ('keyboard.down',  body );
	}
	public up (body) {
		this.config.frame.send ('keyboard.up', body);
	}
	public reset (body) {
		this.config.frame.send ('keyboard.reset', body);
	}
}
@Injectable ()
export class KeyboardInputConfig extends EventConfig {
  valid (d) { 
      return;
  }
  readonly msg = Events.SETTINGS_FRAME_RATE;
  process (d) {
   return;
  }
}