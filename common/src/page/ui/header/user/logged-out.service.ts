import { Injectable } from '@angular/core';
import { ModalService, ModalConfig, ModalComponent } from '@Common/modal';
import { LoggedOutComponent } from '@Common/page/ui/header/user/logged-out/logged-out.component';;

export function loggedOutServiceFactory (config: LoggedOutConfig) {
    return new LoggedOutService (config);
}
@Injectable ({
    providedIn: 'root'
})
export class LoggedOutConfig extends ModalConfig {
    modalOptions = {
        backdrop: 'static'
    }
}
@Injectable ({
    providedIn: 'root'
})
export class LoggedOutService extends ModalService { 
    create (e) {
        return super.create (LoggedOutComponent, ref => {
            ref.instance.info = e;
            ref.changeDetectorRef.detectChanges ();
        });
    }
}
