import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClientCommService } from "./client-comm.service";
import { ClientCommComponent } from './client-comm/client-comm.component';
import { NotifyModule } from '@Common/notify';
import { BrowserModule } from '@Common/browser';
import { UtilModule } from '@Common/util';
import { FxUrlService } from './fx-url.service';
import { FxNotifyService } from './fx-notify.service';
import { ShareModule } from './share/share.module';
import { FxStartMenuService } from './fx-start-menu.service';

;


@NgModule({
  declarations: [ClientCommComponent  ],
  imports: [
    CommonModule,
    NotifyModule,
    BrowserModule,
    UtilModule,
    FormsModule,
    ReactiveFormsModule,

    NgbModule,
    ShareModule

  ],
  providers:[
    ClientCommService,
    FxUrlService,
    FxNotifyService,
    FxStartMenuService

  ],
  exports: [
    ClientCommComponent
  ]
})
export class ClientcommModule {
    constructor() {

    }
 }
