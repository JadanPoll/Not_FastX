import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenComponent } from './screen.component';
import { ConnectModule  } from '../connect';
import { StarnetModule } from '../starnet';
import { LocalSettingsModule } from '../local-settings';
import { RouterModule } from "@angular/router";
import { ConfigModule } from "@Common/config";
import { SecurityConfigService } from "../secuity.service";
import { InputModule } from '../input/input.module';
import { TouchService } from "./touch.service";
import { UserModule } from '@Common/user';
import { ClientcommModule } from '../clientcomm';
import { ClipboardModule } from '../clipboard/clipboard.module';
import { ShareModule } from '../clientcomm/share/share.module';
import { ScreenService } from './screen.service';
@NgModule({
  imports: [
    CommonModule,
    ConnectModule,
    StarnetModule,
    ConfigModule,
    RouterModule,
    LocalSettingsModule,
    InputModule,
    UserModule,
    ClientcommModule,
    ClipboardModule,
    ShareModule
  ],
  declarations: [
    ScreenComponent
  ],
  providers: [
    SecurityConfigService,
    ScreenService,
    TouchService
  ],
  exports: [
    ScreenComponent
  ]
})
export class ScreenModule { }
