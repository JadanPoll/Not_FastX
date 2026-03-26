import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FxEventEmitter } from "@Common/events/fx-event-emitter";

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {
  readonly submit = new FxEventEmitter ();
  onSubmit (e = {}) { this.submit.emit (e); }
  ngOnInit() {
  }

}
