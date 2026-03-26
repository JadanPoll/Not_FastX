import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuModule } from "./menu/menu.module";

import { AppComponent } from './app.component';

import { RouterModule } from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { CloseService } from "./close.service";
import { BrowserModule as FXBrowserModule } from '@Common/browser';
import { StarnetModule, SettingsModule } from './starnet';
import { StorageModule } from "./storage";
import { ModalModule, ModalComponent } from "./modal";
import { ScreenModule } from "./screen";
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faKeyboard, faCog, faArrowsAltV } from '@fortawesome/free-solid-svg-icons';
import { ConfigModule } from "@Common/config";
import { SecurityConfigService } from "./secuity.service";

import { ClientcommModule } from './clientcomm/clientcomm.module';
import { ClipboardModule } from "./clipboard/clipboard.module";

import { NotifyModule } from '@Common/notify';
import { UserModule } from '@Common/user';
import { UiModule } from '@Common/page';


@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [
    ModalComponent
  ],
  imports: [
    MenuModule,
    ModalModule,
    BrowserModule,
    FXBrowserModule,
    ScreenModule,
    StorageModule,
    FontAwesomeModule,
    NgbModule,
    SettingsModule,
    RouterModule,
    AppRoutingModule,
    ConfigModule,
    ClientcommModule,
    ClipboardModule,
    NotifyModule,

    UserModule,
    UiModule
  ],
  providers: [
    Title,
    CloseService,
    SecurityConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor (library: FaIconLibrary) {
    library.addIcons(faKeyboard);
    library.addIcons(faCog);
    library.addIcons(faArrowsAltV);
  }
}
