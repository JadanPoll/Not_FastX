import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FxEventEmitter } from "@Common/events/fx-event-emitter";
import { SubmitComponent } from '@Common/events/submit/submit.component';
import { CancelComponent } from '@Common/events/cancel/cancel.component';


@Component({
  selector: 'emitter-submit-cancel',
  templateUrl: './submit-cancel.component.html',
  styleUrls: ['./submit-cancel.component.css']
})
export class SubmitCancelComponent implements OnInit, SubmitComponent, CancelComponent {
  @Output () readonly submit = new FxEventEmitter ();
  @Output () readonly cancel = new FxEventEmitter ();
  onSubmit (e = {}) { this.submit.emit (e); }
  onCancel (e = {}) { this.cancel.emit (e); }
  ngOnInit() {}

}

