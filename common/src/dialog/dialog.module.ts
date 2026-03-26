import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from '@Common/dialog/confirm/confirm.component';
import { SubmitCancelComponent } from '@Common/dialog/submit-cancel/submit-cancel.component';
import { ButtonModule } from '@Common/button/button.module';
import { EventsModule } from '@Common/events';
import { PromptsService } from '@Common/dialog/confirm/prompts.service';
import { CloseComponent } from '@Common/dialog/close/close.component';
import { InfoComponent } from '@Common/dialog/info/info.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    EventsModule
  ],
  declarations: [ConfirmComponent, SubmitCancelComponent, CloseComponent, InfoComponent],
  exports: [ConfirmComponent, SubmitCancelComponent, CloseComponent, InfoComponent],
  providers: [
    PromptsService
  ]
})
export class DialogModule { }
