import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { KeyboardComponent } from "./keyboard.component";

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  declarations: [
  	KeyboardComponent
  ],
  exports: [
  	KeyboardComponent
  ],
  providers: [],
  bootstrap: [KeyboardComponent]
})
export class KeyboardModule {
  constructor (library: FaIconLibrary) {
    library.addIcons(faKeyboard);
  }
 }
