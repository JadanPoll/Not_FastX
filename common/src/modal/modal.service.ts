import { Injectable, Component, ComponentRef } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "@Common/modal/modal/modal.component";
import { ModalContent, Submit, Cancel } from "@Common/modal/modal-content";
import { SubmitComponent, CancelComponent, SubmitCancelComponent } from '@Common/events';

export function modalServiceFactory (config: ModalConfig) {
  return new ModalService (config);
}
export function modalConfigFactory (ms: NgbModal) {
  return new ModalConfig (ms);
}
@Injectable ({
  providedIn: 'root'
})
export class ModalConfig {
  modal = ModalComponent;
  modalOptions = <any>{};
  constructor (private ms: NgbModal) {}
  get modalService () {
    return this.ms;
  }
  create (component, onLoad = (ref, mi?) => {}, options = {}, empty): Promise<any> {
    let s$;
    let c$;
    let l$;
    let mi = this.ms.open (this.modal, Object.assign(options,  this.modalOptions));
    mi.componentInstance.component = component;
    mi.componentInstance.empty = empty;
    l$ = mi.componentInstance.loaded.subscribe (ref => {
      if (this.hasSubmit (ref.instance)) s$ = ref.instance.submit.subscribe (d => {
        mi.close (d)
      });
      if (this.hasCancel (ref.instance)) c$ = ref.instance.cancel.subscribe (e => {
        mi.dismiss (e);
      });
      onLoad (ref, mi);
    })
    return new Promise ((resolve, reject) => {
      mi.result
      .then (d => {
        this.unsubscribe (l$);
        this.unsubscribe (s$);
        this.unsubscribe (c$);
        resolve (d);
      })
      .catch (e => {
        this.unsubscribe (l$);
        this.unsubscribe (s$);
        this.unsubscribe (c$);
        reject (e)
      });
    })
  }

  private hasSubmit (component) {
    return (component instanceof SubmitComponent || component instanceof SubmitCancelComponent)
  }
  private hasCancel (component) {
    return (component instanceof CancelComponent || component instanceof SubmitCancelComponent)
  }
  private unsubscribe (n$) {
    if (!n$) return;
    n$.unsubscribe ();
  }
}


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private config;
  constructor(config: ModalConfig) { 
    this.config = config;
  }
  create (component, onLoad?, options?, empty?) {
    return this.config.create (component, onLoad, options, empty);
  }
  
}
