import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitCancelComponent } from '@Common/events/submit-cancel/submit-cancel.component';
import { SubmitComponent } from '@Common/events/submit/submit.component';
import { CancelComponent } from '@Common/events/cancel/cancel.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CancelComponent,
    SubmitCancelComponent,
    SubmitComponent
  ],
  exports: [
    CancelComponent,
    SubmitCancelComponent,
    SubmitComponent
  ]
})
export class EventsModule { }
