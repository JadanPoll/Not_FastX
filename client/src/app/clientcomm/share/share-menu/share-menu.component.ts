import { Component, OnInit,  ChangeDetectorRef, Input, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShareService } from '@Common/session/actions/share';
import { Session } from '@Common/session/session';
import { FxShareService } from '../fx-share.service';

@Component({
  selector: 'fx-client-share-menu',
  templateUrl: './share-menu.component.html',
  styleUrls: ['./share-menu.component.css']
})
export class ShareMenuComponent implements OnInit {
  @Output() onResetShare = new EventEmitter();
  master = {} as any;
  clients$;
  serverData$;
  clients = [];
  serverData = {} as any;
  id;
  long = true;
  constructor(private shareService: FxShareService,
     private ss: ShareService, 
     private route: ActivatedRoute,
     private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.clients$ = this.shareService.clients.subscribe((d:any) => {
      this.clients = d.clients || [];
      this.master =  this.clients.filter(c => c.role === "master");
      this.cdr.detectChanges();
    });
    this.serverData$ = this.shareService.serverData.subscribe((d:any) => {
      this.serverData = d || {};
      this.cdr.detectChanges();
    });
    this.id = this.route.snapshot.params.id;
    
  }
  addUserMenu() {
    this.ss.open({ id: this.id } as Session)
  }
  showLong() {
    return this.long;
  }
  toggleLong() {
    this.long = !this.long;
  }
  ngOnDestroy() {
    this.clients$.unsubscribe();
    this.serverData$.unsubscribe();
  }
  hide() {
    this.shareService.setVisibility(false);
  }
  isMaster() {
    return this.serverData.role === 'master';
  }
  resetShare($event) {
    this.onResetShare.emit($event);
  }

}
