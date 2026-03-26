import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@Common/browser';
import { StorageService } from './storage.service';
import { LocalStorageService  } from "./local-storage.service";
import { StorageEventConfig, StorageEventService } from "./storage-event.service";
import { StarnetModule } from "../starnet";

@NgModule({
  imports: [
    CommonModule,
    StarnetModule,
    BrowserModule
  ],
  declarations: [],
  providers: [
    StorageEventService,
    StorageEventConfig,
    { provide: StorageService, useClass: LocalStorageService}
  ]
})
export class StorageModule { }
