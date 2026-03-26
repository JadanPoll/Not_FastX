import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WasmService, WasmConfig, wasmConfigFactory } from "./wasm.service";
import { storageEventServiceFactory, StorageModule, StorageService } from "../storage"
import { StarnetModule, IframeService, } from '../starnet';
import { WindowRef } from '@Common/browser';
import { IgnoreFrameConfig, ignoreFrameConfigFactory, IgnoreFrameService, ignoreFrameServiceFactory } from './ignore-frame.service';
import { LocalResizeConfig, localResizeConfigFactory, LocalResizeService, localResizeServiceFactory } from './local-resize.service';


@NgModule({
  imports: [
    CommonModule,
    StorageModule,
    StarnetModule,
  ],
  declarations: [],
  providers: [
    { provide: WasmConfig, useFactory: wasmConfigFactory,
       deps: [WindowRef, StorageService, IframeService  ] },
    { provide: WasmService, useFactory: storageEventServiceFactory, deps: [WasmConfig]},
    { provide: IgnoreFrameConfig, useFactory: ignoreFrameConfigFactory,
      deps: [WindowRef, StorageService, IframeService ]},
    { provide: IgnoreFrameService, useFactory: ignoreFrameServiceFactory, deps: [IgnoreFrameConfig]},
    { provide: LocalResizeConfig, useFactory: localResizeConfigFactory,
      deps: [WindowRef, StorageService, IframeService ]},
    { provide: LocalResizeService, useFactory: localResizeServiceFactory, deps: [LocalResizeConfig]},
  ]
})
export class LocalSettingsModule { }
