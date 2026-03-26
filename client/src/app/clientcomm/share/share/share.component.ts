import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { WindowRef } from '@Common/browser';
import { FxStartMenuService } from '../../fx-start-menu.service';
import { FxShareService } from '../fx-share.service';

@Component({
  selector: 'fx-client-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {
  @Input() id: string;
  helloSent = false;
  config$;
  clients$;
  serverData$;
  clients = {} as any;
  serverData = {} as any;
  conf = {} as any;
  constructor(private route: ActivatedRoute, 
    private ss: FxShareService, 
    private startMenuService: FxStartMenuService,
    private cdr: ChangeDetectorRef, 
    private wref: WindowRef) { }
  draggable = {};
  resetShare = false
  ngOnInit(): void {
    this.config$ = this.ss.config.subscribe(d => {
      this.conf = d
      this.cdr.detectChanges();
    });

    this.wref.addEventListener('message', e => {
      if(e.data.msg !== 'clientcomm-ready')
        return;
      this.ss.hello({
        name: this.wref.localStorage.displayName || ""
      });
      this.startMenuService.hello();
    });
    this.clients$ = this.ss.clients.subscribe(d => {
      this.clients = d as any;
      this.setMyStatus();
    });
    this.serverData$ = this.ss.serverData.subscribe(d => {
      this.serverData = d;
      this.setMyStatus();
    });

  }
  ngOnDestroy() {
    this.config$.unsubscribe();
    this.clients$.unsubscribe();
  }
  
  showShare() {
    return this.conf.visible;
  }
  doResetShare(e) {
    this.resetShare = true;
  }
  showGuestLogin() {
    switch(this.route.snapshot.url[0].path) {
      case 'guest':
      case 'share':
          return !this.helloSent || this.resetShare;
      default:
          return this.resetShare;
    }
  }
  setMyStatus() {
    if(!this.clients.clients)
      return;
    if(!this.serverData.client)
        return;
      let me = this.clients.clients.find(c => c.client === this.serverData.client);
      if(!me)
        return;
      switch(me.status) {
        case 'lobby':
          this.setLobby(true);
        default:
          this.setLobby(false);
      }
  }
  setLobby(b) {

  }
  onHelloSent($event) {
    this.helloSent = true;
    this.resetShare = false;
    this.cdr.detectChanges();
  }
  onCancel() {
    this.resetShare = false;
    this.cdr.detectChanges();
  }

}
