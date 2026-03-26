import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { InputModule as StarNetInput } from "../starnet";
import { InputVisibilityService } from './input-visibility.service';
import { MouseComponent } from './mouse/mouse.component';
import { InputComponent } from './input/input.component';
import { TouchMouseService } from './touchmouse.service';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { faCog, faThumbtack, faTimes } from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [
    KeyboardComponent,
    MouseComponent,
    InputComponent,
    
  ],
  imports: [
    CommonModule,
    StarNetInput,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [
    InputComponent
  ],
  providers: [
    InputVisibilityService,
    TouchMouseService
  ]
})
export class InputModule { 
  constructor (library: FaIconLibrary) {
    library.addIcons(faCog);
    library.addIcons(faThumbtack);
    library.addIcons(faTimes)
  }
}
