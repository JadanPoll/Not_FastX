import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router"

import { BrowserModule } from '@Common/browser';
import { UtilModule } from '@Common/util';
import { ShareComponent } from './share/share.component';
import { ShareModule as ApiShareModule } from '@Common/session/actions/share';
import { FxShareService } from './fx-share.service';
import { ClientsComponent } from './clients/clients.component';
import { GuestLoginComponent } from './guest-login/guest-login.component';
import { ClientUserComponent } from './clients/client-user/client-user.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPencilAlt, faCog, faUsers, 
   faGamepad, faCaretSquareUp, 
  faGripLinesVertical, faGripVertical, faCaretRight, faUser, faUserFriends, faHome,
  faTools, faWrench, faEyeSlash, faUserPlus, faTimes, faEye
} from '@fortawesome/free-solid-svg-icons';
import { ControlComponent } from './control/control.component';
import { ShareMenuComponent } from './share-menu/share-menu.component';
import { LobbyComponent } from './lobby/lobby.component';
import { ModalModule } from '@Common/modal';

@NgModule({
  declarations: [ ShareComponent, ClientsComponent, GuestLoginComponent, ClientUserComponent, ControlComponent, ShareMenuComponent, LobbyComponent],
  imports: [
    CommonModule,

    BrowserModule,
    UtilModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    NgbModule,
    ModalModule,
    ApiShareModule,

  ],
  providers:[
    FxShareService
  ],
  exports: [
    ShareComponent
  ]
})
export class ShareModule {
    constructor(library: FaIconLibrary) {
      library.addIcons(faPencilAlt);
      library.addIcons(faCog);
      library.addIcons(faUsers);
      library.addIcons(faGamepad);
      library.addIcons(faUser);
      library.addIcons(faUserFriends);
      library.addIcons(faHome);
      library.addIcons(faTools);
      library.addIcons(faWrench);
      library.addIcons(faCaretSquareUp);
      library.addIcons(faGripLinesVertical);
      library.addIcons(faGripVertical);
      library.addIcons(faCaretRight);
      library.addIcons(faUserPlus);
      library.addIcons(faTimes);
      library.addIcons(faEyeSlash);
      library.addIcons(faEye);
    }
 }
