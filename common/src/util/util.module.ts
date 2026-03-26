import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalUrlService } from "@Common/util/external-url.service";
import { CommonUrlService } from "@Common/util/common-url.service"
import { ConfigModule } from "@Common/config";
import { ExtensionService } from './extension.service';
import { BrowserModule } from '@Common/browser';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule,
    BrowserModule
  ],
  declarations: [],
  providers: [
    ExternalUrlService,
    CommonUrlService,
    ExtensionService
  ]
})
export class UtilModule { }
