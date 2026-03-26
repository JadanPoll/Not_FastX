import { ComponentFactoryResolver, ViewContainerRef, ComponentRef } from "@angular/core";
import { Injectable } from '@angular/core';

@Injectable()
export class ComponentLoaderService {

  constructor (private cfr: ComponentFactoryResolver) { }
  load (component: any, vcr: ViewContainerRef): ComponentRef <any> {
    const factory = this.cfr.resolveComponentFactory (component);
    const ref = vcr.createComponent (factory);
    ref.changeDetectorRef.detectChanges();
    return ref;
  }
}
