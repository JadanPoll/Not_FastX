import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyboardInputService, KeyboardInputConfigFactory, KeyboardInputServiceFactory, KeyboardInputConfig } from './keyboard.service';
import { MouseInputService, MouseInputConfigFactory, MouseInputServiceFactory, MouseInputConfig } from './mouse.service';

import { IframeService } from '../iframe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    { provide: KeyboardInputConfig, useFactory: KeyboardInputConfigFactory, deps: [IframeService]},
    { provide: KeyboardInputService, useFactory: KeyboardInputServiceFactory, deps: [KeyboardInputConfig]},
    { provide: MouseInputConfig, useFactory: MouseInputConfigFactory, deps: [IframeService]},
    { provide: MouseInputService, useFactory: MouseInputServiceFactory, deps: [MouseInputConfig]}
  ],
  
})
export class InputModule { }
