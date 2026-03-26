import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '@Common/config/config.service';
import { BrowserModule } from '@Common/browser';
import { HttpClientModule } from "@angular/common/http"; 
import { UserConfigService } from './user-config.service';
import { PermissionsConfigService } from './permissions.service';
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [ConfigService, UserConfigService, PermissionsConfigService]
})
export class ConfigModule { }
