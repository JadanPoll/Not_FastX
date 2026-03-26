import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentLoaderService } from "@Common/component-loader/component-loader.service"

export let providers = [ComponentLoaderService];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: providers,
})
export class ComponentLoaderModule { }
