import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventConfig, eventServiceFactory, IframeService  } from '../iframe';
import { GeometryService, GeometryConfig, geometryConfigFactory, geometryServiceFactory } from "./geometry.service";
import { SettingsService, SettingsConfig, settingsConfigFactory, settingsServiceFactory } from './settings.service';
import { CompressionService, CompressionConfig, compressionConfigFactory, compressionServiceFactory } from './compression.service';
import { FrameRateService, FrameRateConfig, frameRateConfigFactory, frameRateServiceFactory } from './frame-rate.service';
import { FrameWindowService, FrameWindowConfig, frameWindowConfigFactory, frameWindowServiceFactory } from './frame-window.service';
import { NetworkAutodetectService, NetworkAutodetectConfig, networkAutodetectConfigFactory, networkAutodetectServiceFactory } from './network-autodetect.service';
import { KeyboardService, KeyboardConfig, keyboardConfigFactory, keyboardServiceFactory} from "./keyboard.service";
import { ScalingService, scalingServiceFactory, ScalingConfig, scalingConfigFactory } from './scaling.service';
import { BigBlockService, bigBlockServiceFactory, BigBlockConfig, bigBlockConfigFactory } from './big-block.service';
import { BigBlockSizeService, bigBlockSizeServiceFactory, BigBlockSizeConfig, bigBlockSizeConfigFactory } from './big-block-size.service';
import { SmallBlockService, smallBlockServiceFactory, SmallBlockConfig, smallBlockConfigFactory } from './small-block.service';


let providers = [
  { provide: SettingsConfig, useFactory: settingsConfigFactory, deps: [IframeService] },
  { provide: GeometryConfig, useFactory: geometryConfigFactory, deps: [IframeService], },
  { provide: FrameRateConfig, useFactory: frameRateConfigFactory, deps: [IframeService], },
  { provide: FrameWindowConfig, useFactory: frameWindowConfigFactory, deps: [IframeService], },
  { provide: KeyboardConfig, useFactory: keyboardConfigFactory, deps: [IframeService], },
  { provide: CompressionConfig, useFactory: compressionConfigFactory, deps: [IframeService], },
  { provide: NetworkAutodetectConfig, useFactory: networkAutodetectConfigFactory, deps: [IframeService], },
  { provide: BigBlockConfig, useFactory: bigBlockConfigFactory, deps: [IframeService]},
  { provide: BigBlockSizeConfig, useFactory: bigBlockSizeConfigFactory, deps: [IframeService]},
  { provide: SmallBlockConfig, useFactory: smallBlockConfigFactory, deps: [IframeService]},
  
  { provide: GeometryService, useFactory: geometryServiceFactory, deps: [GeometryConfig]},
  { provide: CompressionService, useFactory: compressionServiceFactory, deps: [ CompressionConfig]},
  { provide: FrameRateService, useFactory: frameRateServiceFactory, deps: [FrameRateConfig]},
  { provide: FrameWindowService, useFactory: frameWindowServiceFactory, deps: [FrameWindowConfig]},
  { provide: SettingsService, useFactory: settingsServiceFactory, deps: [SettingsConfig]},
  { provide: NetworkAutodetectService, useFactory: networkAutodetectServiceFactory, deps: [NetworkAutodetectConfig]},
  { provide: KeyboardService, useFactory: keyboardServiceFactory, deps: [KeyboardConfig]},
  { provide: ScalingConfig, useFactory: scalingConfigFactory, deps: [IframeService]},
  { provide: ScalingService, useFactory: scalingServiceFactory, deps: [ScalingConfig]},
  { provide: BigBlockService, useFactory: bigBlockServiceFactory, deps: [BigBlockConfig]},
  { provide: BigBlockSizeService, useFactory: bigBlockSizeServiceFactory, deps: [BigBlockSizeConfig]},
  { provide: SmallBlockService, useFactory: smallBlockServiceFactory, deps: [SmallBlockConfig]}
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: providers
})
export class SettingsModule { }
