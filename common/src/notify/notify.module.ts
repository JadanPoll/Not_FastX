import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastyModule } from "ngx-toasty";
import {  NotifyService } from '@Common/notify/notify.service';
import { NotifyComponent } from '@Common/notify/notify/notify.component';
import { BrowserModule } from '@Common/browser';

@NgModule({
  imports: [
    CommonModule,
    ToastyModule.forRoot (),
    BrowserModule
  ],
  declarations: [NotifyComponent],
  exports: [NotifyComponent],
  providers: [
    NotifyService
  ]
})
export class NotifyModule { }
