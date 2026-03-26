import { Component, OnInit, Input } from '@angular/core';
import { FxShareService } from '../../clientcomm/share/fx-share.service';

@Component({
  selector: 'fx-client-share-button',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareButtonComponent implements OnInit {
  @Input () config = {} as any;
  shareConf$
  pressed = false;
  constructor(private ss: FxShareService) { }

  ngOnInit() {
    this.shareConf$ = this.ss.config.subscribe((d:any) => {
      this.pressed = d.visible;
    });
  }
  ngOnDestroy() {
    this.shareConf$.unsubscribe();
  }
  toggleShare() {
    this.pressed = ! this.pressed;
    this.ss.setVisibility(this.pressed);
  }
  isPressed() {
    return this.pressed;
  }
  

}
