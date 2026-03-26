import { Injectable } from '@angular/core';
import { DisconnectService, ErrorService, IframeService } from "./starnet";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "./modal";
import { ConfigService } from '@Common/config';

@Injectable()
export class CloseService {
  config$;
  ui;
  home;
  constructor(private dis: DisconnectService, 
    private err: ErrorService, 
    private modalService: NgbModal, 
    private cs: ConfigService,
    private frame: IframeService
  ) {
    this.dis.getSubject ().subscribe (this.disconnect.bind (this));
    this.err.getSubject ().subscribe (this.error.bind (this));
    this.cs.subscribe (d => {
      this.ui = d.ui;
      this.home = d.home;
    })
   }
  
  disconnect (d) {
    this.handle ({
      title: 'Client Disconnected',
      content: d
    });
  }
  error (d) {
    this.handle ({
      title: 'Connection Error',
      content: d
    });
  }
  handle (d) {
    this.frame.destroy ();
    if (this.ui && this.ui.disableModal) return;
    setTimeout (() => { 
      //workaround for expression changed after it was checked but in ng-bootstrap 
      //https://github.com/ng-bootstrap/ng-bootstrap/issues/1252
      let mi = this.modalService.open (ModalComponent, {
        backdrop: 'static',
        keyboard: false,
        windowClass: 'sn-modal'
      });
      mi.componentInstance.title = d.title;
      mi.componentInstance.content = d.content;
      if(this.home && !this.home.hide) {
        mi.componentInstance.home = this.home;
      }
      mi.componentInstance.cdr.detectChanges ();
    })
    
  }

}
