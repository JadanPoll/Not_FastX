import { Component, OnInit, Output } from '@angular/core';
import { FxEventEmitter } from "@Common/events/fx-event-emitter";
@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css']
})
export class CancelComponent implements OnInit {
  @Output () cancel = new FxEventEmitter ();
  onCancel (e = {}) { this.cancel.emit (e); }
  ngOnInit() {}
}
