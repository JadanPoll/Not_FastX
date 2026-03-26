import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faServer, faDisplay, faUser, faCircleInfo , faAddressCard, faPowerOff, faChartSimple, faCircleUser} from "@fortawesome/pro-regular-svg-icons";

import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from "@Common/page/ui/header/header.component";
import { FooterComponent } from "@Common/page/ui/footer/footer.component";
import { AdminComponent } from '@Common/page/ui/admin/admin.component';
import { ConfigModule } from '@Common/config';
import { UserModule } from '@Common/user';
import { ListItemComponent } from '@Common/page/ui/header/list-item/list-item.component';
import { UserComponent } from '@Common/page/ui/header/user/user.component';
import { NotifyModule } from "@Common/notify";
import { LoggedOutComponent } from '@Common/page/ui/header/user/logged-out/logged-out.component';
import { LoggedOutService, loggedOutServiceFactory, LoggedOutConfig } from '@Common/page/ui/header/user/logged-out.service';
import { DialogModule } from '@Common/dialog';
import { EventsModule } from '@Common/events';
import { UpgradeModule } from '@Common/page/upgrade';
import { ManageComponent } from '@Common/page/ui/manage/manage.component';
import { ManageComponent as ManageSshComponent, SshModule } from "@Common/ssh/ssh";
import { HomePageComponent } from './header/user/home-page/home-page.component';
import { BookmarkModule } from '@Common/session/actions/start/bookmark';
import { NotifyComponent } from './notify/notify.component';
import { SetupService } from './setup.service';
import { BrowserModule } from '@Common/browser';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    ConfigModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserModule,
    DialogModule,
    EventsModule,
    NotifyModule,
    SshModule,
    ConfigModule,
    UpgradeModule,
    UserModule,
    BookmarkModule,
    UpgradeModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    ManageComponent,
    ListItemComponent,
    UserComponent,
   
    LoggedOutComponent,
    NotifyComponent,
    HomePageComponent
  ],
  entryComponents: [
    AdminComponent,
    ListItemComponent,
    LoggedOutComponent,
    ManageSshComponent,
    HomePageComponent,
    NotifyComponent,
    
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    LoggedOutConfig,
    { provide: LoggedOutService, useFactory: loggedOutServiceFactory, deps: [LoggedOutConfig]},
    SetupService,
  ]
})
export class UiModule {
  constructor(library: FaIconLibrary) {
    library.addIcons( faServer, faDisplay, faUser,  faCircleInfo , faAddressCard, faPowerOff, faChartSimple, faCircleUser );
  }
 }
