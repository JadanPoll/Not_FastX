import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowRef, getWindow } from '@Common/browser/window-ref';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    { provide: WindowRef, useFactory: getWindow }
  ]
})
export class BrowserModule { }
