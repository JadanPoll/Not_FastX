import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IframeModule, IframeService, EventService, EventConfig, eventServiceFactory } from './iframe';
import { ConnectService, ConnectConfig, connectConfigFactory, connectServiceFactory } from './connect.service';
import { SettingsModule } from './settings';
import { DisconnectConfig, DisconnectService, disconnectConfigFactory, disconnectServiceFactory } from './disconnect.service';
import { ErrorService, ErrorConfig, errorServiceFactory, errorConfigFactory } from './error.service';
import { CapabilitiesConfig, CapabilitiesService, capabilitiesConfigFactory, capabilitiesServiceFactory } from './capability.service';
import { ClientCommService, ClientCommConfig, clientCommConfigFactory, clientCommServiceFactory } from './clientcomm.service';
import { ClipboardService, clipboardServiceFactory, ClipboardConfig, clipboardConfigFactory } from './clipboard.service';
import { HighQualityUpgradesConfig, highQualityUpgradesConfigFactory, HighQualityUpgradesService, highQualityUpgradesServiceFactory  } from './settings/high-quality-upgrades-service';

let providers = [
  { provide: ConnectConfig, useFactory: connectConfigFactory, deps: [IframeService] },
  { provide: DisconnectConfig, useFactory: disconnectConfigFactory, deps: [IframeService] },
  { provide: ErrorConfig, useFactory: errorConfigFactory, deps: [IframeService] },
  { provide: ConnectService, useFactory: connectServiceFactory, deps: [ConnectConfig]},
  { provide: DisconnectService, useFactory: disconnectServiceFactory, deps: [DisconnectConfig]},
  { provide: ErrorService, useFactory: errorServiceFactory, deps: [ErrorConfig]},
  { provide: CapabilitiesConfig, useFactory: capabilitiesConfigFactory, deps: [IframeService] },
  { provide: CapabilitiesService, useFactory: capabilitiesServiceFactory, deps: [CapabilitiesConfig]},
  { provide: ClientCommConfig, useFactory: clientCommConfigFactory, deps: [IframeService]},
  { provide: ClientCommService, useFactory: clientCommServiceFactory, deps: [ClientCommConfig]},
  { provide: ClipboardConfig, useFactory: clipboardConfigFactory, deps: [IframeService]},
  { provide: ClipboardService, useFactory: clipboardServiceFactory, deps: [ClipboardConfig] },
  { provide: HighQualityUpgradesConfig, useFactory: highQualityUpgradesConfigFactory, deps:[IframeService]},
  { provide: HighQualityUpgradesService, useFactory: highQualityUpgradesServiceFactory, deps: [HighQualityUpgradesConfig]},
];


@NgModule({
  imports: [
    CommonModule,
    IframeModule,
    SettingsModule,
  ],
  declarations: [],
  providers: providers
})
export class StarnetModule { 
}
