import { Injectable } from '@angular/core';
import { ModalConfig, ModalService } from '@Common/modal';
import { Session } from '@Common/session/session';
import { SessionActionService } from '@Common/session/actions/session-action.service';
import { NotifyService, Errors } from '@Common/notify';
import { ShareComponent } from "./share/share.component"
import { DataArrayService } from '@Common/data';

export function shareServiceFactory (
  config: ShareConfig, 
  ss: SessionActionService, 
  ns: NotifyService) {
  return new ShareService (config, ss, ns);
}

@Injectable({
  providedIn: 'root'
})
export class ShareConfig extends ModalConfig {
  modalOptions = {
    size: 'xl',
    modalDialogClass: 'border-0 bg-transparent hide-content',
    scrollable: true
  }
}

@Injectable({
  providedIn: 'root'
})
export class ShareService extends ModalService {
  constructor (config: ShareConfig, 
    private ss: SessionActionService,
    private ns: NotifyService) {
    super (config);
  }
  open (selected:  Session) {
    return super.create (ShareComponent, (ref) => {
      ref.instance.session  = selected;
     
      ref.changeDetectorRef.detectChanges ();
    }, {}, true);
  }
  
  private _success (s, c, service?: DataArrayService) {
    if(service)
      service.delete(c.id);
    this.ns.success ({
      title: s.status,
      msg: c.id
    });
  }
  private _error (s, c) {
    this.ns.error ({
      title: Errors.fail ("session", "share"),
      msg: s.message
    });
  }
}
