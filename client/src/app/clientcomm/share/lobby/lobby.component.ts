import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FxShareService } from '../fx-share.service';

@Component({
  selector: 'fx-client-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  meNotify$;
  shareMe = {} as any;
  constructor(private cdr: ChangeDetectorRef, private ss: FxShareService) { }

  ngOnInit(): void {

    this.meNotify$ = this.ss.me.subscribe(d => {
      this.shareMe = d;
      this.cdr.detectChanges();
    });
  }
  ngOnDestroy() {
    this.meNotify$.unsubscribe();
  }
  inLobby() {
    return this.shareMe && this.shareMe.me && this.shareMe.me.status === 'lobby';
  }

}
