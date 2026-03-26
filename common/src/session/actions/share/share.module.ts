import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { faUserPlus, faLink, faCopy } from '@fortawesome/free-solid-svg-icons';
import { ShareComponent } from './share/share.component';
import { ShareService, ShareConfig, shareServiceFactory } from './share.service';
import { PageModule, } from '@Common/page';
import { SessionActionService } from "@Common/session/actions/session-action.service";
import { NotifyModule, NotifyService } from '@Common/notify';
import { DialogModule,  PromptsService  } from "@Common/dialog";
import { EventsModule } from '@Common/events';
import { ModalModule } from '@Common/modal';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    NotifyModule,
    DialogModule,
    EventsModule,
    FontAwesomeModule,
    FormsModule,
    ModalModule,
    ReactiveFormsModule
  ],
  declarations: [ShareComponent],
  providers: [
    ShareConfig,
    { provide: ShareService, useFactory: shareServiceFactory, 
      deps: [ShareConfig, SessionActionService, NotifyService] },
  ],
  entryComponents: [
    ShareComponent
  ]
})
export class ShareModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faUserPlus);
    library.addIcons(faLink);
    library.addIcons(faCopy);
  }
 }
