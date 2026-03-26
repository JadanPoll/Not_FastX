import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IframeService } from './iframe.service';
import { EventConfig, EventService } from './event.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    IframeService,
    EventService,
    EventConfig
  ]
})
export class IframeModule { }
