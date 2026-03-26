import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardComponent } from './clipboard/clipboard.component';



@NgModule({
  declarations: [ClipboardComponent],
  imports: [
    CommonModule
  ],
  exports: [ ClipboardComponent]
})
export class ClipboardModule { }
