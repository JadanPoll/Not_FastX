import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { NgbModule, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from '@angular/common';
import { ModalComponent } from "@Common/modal/modal/modal.component";
import { Pane } from "@Common/modal/pane.directive";
import { ModalService, ModalConfig, modalConfigFactory } from '@Common/modal/modal.service';
import { ComponentLoaderModule } from '@Common/component-loader';

@NgModule({
  imports: [
    CommonModule,
    ComponentLoaderModule,
    NgbModule
  ],
  declarations: [
    ModalComponent,
    Pane,
  ],
  entryComponents: [
    ModalComponent
  ],
  exports: [
    ModalComponent,
    Pane,
  ],
  providers: [
    ModalService,
    { provide: ModalConfig, useFactory: modalConfigFactory, deps: [NgbModal]}
  ]
})
export class ModalModule { 
  static withComponents(components: any[]) {
    return {
        ngModule: ModalModule,
        providers: [
            {provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true}
        ]
    }
}
}
