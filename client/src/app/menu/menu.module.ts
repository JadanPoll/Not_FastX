import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
// import { ResizeComponent } from './resize/resize.component';
import { SettingsModule } from "./settings/settings.module";
import { KeyboardModule } from './keyboard/keyboard.module';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { StarnetModule } from '../starnet';

import { faArrowsAltV, faHome, faFolderOpen, faExpand, faCompress, faUsers } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { FullscreenComponent } from './fullscreen/fullscreen.component';
import { ShareButtonComponent } from './share/share.component';
import { ShareModule } from '../clientcomm/share/share.module';



@NgModule({
  declarations: [
    MenuComponent,
    // ResizeComponent,
    HomeComponent,
    FullscreenComponent,
    FileManagerComponent,
    ShareButtonComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsModule,
    KeyboardModule,
    StarnetModule,
    FontAwesomeModule, 
    ShareModule,
    NgbModule
  ],
  exports: [
    MenuComponent
  ],
  providers: [],
  bootstrap: [MenuComponent]
})
export class MenuModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faArrowsAltV);
    library.addIcons(faHome);
    library.addIcons(faFolderOpen);
    library.addIcons(faExpand);
    library.addIcons(faCompress);
    library.addIcons(faUsers);
  }
 }
