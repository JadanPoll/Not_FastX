import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FrameWindowComponent } from './frame-window/frame-window.component';
import { CompressionComponent } from './compression/compression.component';
import { SettingsComponent } from './settings.component';
import { FrameRateComponent } from './frame-rate/frame-rate.component';
import { SliderComponent } from '../slider/slider.component';
import { WasmComponent } from './wasm/wasm.component';
import { LocalSettingsModule } from "../../local-settings";
import { StarnetModule } from '../../starnet';
import { NetworkAutodetectComponent } from './network-autodetect/network-autodetect.component';

import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCog, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { ScalingComponent } from './scaling/scaling.component';
import { BrowserModule } from '../../../../../common/src/browser/browser.module';
import { SmallBlockComponent } from './small-block/small-block.component';
import { BigBlockComponent } from './big-block/big-block.component';
import { BigBlockSizeComponent } from './big-block-size/big-block-size.component';
import { IgnoreFrameComponent } from './ignore-frame/ignore-frame.component';
import { HighQualityUpgradesComponent } from './high-quality-upgrades/high-quality-upgrades';
import { DrawImmediatelyComponent } from './draw-immediately/draw-immediately.component';
import { NetworkComponent } from './network/network.component';
import { ImageComponent } from './image/image.component';
import { ResizeComponent } from './resize/resize.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StarnetModule,
    FontAwesomeModule, 
    LocalSettingsModule,
    NgbModule,
    NgxSliderModule,
    BrowserModule,
    RouterModule,
  ],
  declarations: [
  	SettingsComponent,
    FrameRateComponent,
    FrameWindowComponent,
    IgnoreFrameComponent,
    CompressionComponent,
    SliderComponent,
    WasmComponent,
    NetworkAutodetectComponent,
    ScalingComponent,
    SmallBlockComponent,
    BigBlockComponent,
    BigBlockSizeComponent,
    HighQualityUpgradesComponent,
    DrawImmediatelyComponent,
    NetworkComponent,
    ImageComponent,
    ResizeComponent
  ],
  exports: [
  	SettingsComponent
  ],
  providers: [
  ],
  bootstrap: [SettingsComponent]
})
export class SettingsModule {
    constructor(library: FaIconLibrary) {
      library.addIcons(faCog, faSlidersH);
    }
 }
