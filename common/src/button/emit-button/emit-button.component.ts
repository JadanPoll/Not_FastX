import { Component, OnInit, Input, Output, ViewChild,} from '@angular/core';
import { FxEventEmitter } from "@Common/events";

@Component({
  selector: 'emit-button',
  templateUrl: './emit-button.component.html',
  styleUrls: ['./emit-button.component.css']
})
export class EmitButtonComponent implements OnInit {
  @Output () onClick = new FxEventEmitter (); 
  @ViewChild ('button', {static: false}) button;
  @Input () disabled = false;
  @Input () buttonClass = "";
  constructor () {}
  ngOnInit() {}
  clicked (event) { 
    this.onClick.emit (event);
  }

}
