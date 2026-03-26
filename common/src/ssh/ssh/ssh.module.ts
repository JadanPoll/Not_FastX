import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SshComponent } from './ssh/ssh.component';
import { KeyboardInteractiveComponent } from './keyboard-interactive/keyboard-interactive.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PasswordComponent } from './password/password.component';
import { PublicKeyComponent } from './public-key/public-key.component';
import { EventsModule } from "@Common/events";
import { DialogModule } from "@Common/dialog"
import { ConfigService } from "./config.service";
import { DecryptComponent } from './public-key/decrypt/decrypt.component';
import { SignComponent } from './sign/sign.component';
import { LoginComponent } from './login/login.component';
import { DeleteComponent } from "./manage/delete/delete.component";
import { ManageComponent } from './manage/manage.component';
import { GridModule } from "@Common/grid"
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {  faTimes, faPlus, faEye, faUserTie, faKey } from '@fortawesome/free-solid-svg-icons';
import { BannerComponent } from './banner/banner.component';
import { ServerComponent } from './server/server.component';
import { FormDataService } from './form-data.service';

import { UtilModule } from '@Common/util';
// import { PageModule, UiModule } from '@Common/page';

@NgModule({
  declarations: [SshComponent, 
    KeyboardInteractiveComponent, 
    PasswordComponent, 
    PublicKeyComponent, 
    DecryptComponent, 
    DeleteComponent,
    SignComponent, 
    LoginComponent, 
    ManageComponent, BannerComponent, ServerComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    EventsModule,
    DialogModule,
    GridModule,
    FontAwesomeModule,
  //  PageModule, 
   UtilModule
  ],
  providers: [
    FormDataService
  ],
  exports: [
    SshComponent,
    ManageComponent
  ]
})
export class SshModule { 
  constructor (library: FaIconLibrary) {
    library.addIcons (faTimes);
    library.addIcons (faPlus);
    library.addIcons(faEye);
    library.addIcons(faUserTie);
    library.addIcons(faKey);
  }
}
