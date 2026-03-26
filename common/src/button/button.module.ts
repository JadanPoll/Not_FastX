import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsModule } from "@Common/events";

import { EmitButtonComponent } from '@Common/button/emit-button/emit-button.component';
import { SubmitButtonComponent } from '@Common/button/submit-button/submit-button.component';
import { CancelButtonComponent } from '@Common/button/cancel-button/cancel-button.component';
import { ButtonTextService } from '@Common/button/button-text.service';

@NgModule({
  imports: [
    CommonModule,
    EventsModule
  ],
  declarations: [ EmitButtonComponent, SubmitButtonComponent, CancelButtonComponent],
  exports: [
    EmitButtonComponent,
    SubmitButtonComponent, 
    CancelButtonComponent
  ],
  providers: [
      ButtonTextService
  ]
})
export class ButtonModule { }
