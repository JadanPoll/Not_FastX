import { Component, OnInit, Output, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FxEventEmitter } from "@Common/events";

@Component({
  selector: 'footer-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.css']
})
export class CloseComponent implements OnInit {
  @Output () submit = new FxEventEmitter ();
  @ViewChild ('submit', {static: false}) submitButton;
  
  constructor(private cdr: ChangeDetectorRef) { }
  setText(t) {
    this.submitButton.text = t;
    this.cdr.detectChanges();
  }
  ngOnInit() {
    
  }
  ngAfterViewInit () {
    this.submitButton.text = "Close";
    this.cdr.detectChanges ();
  }
  onSubmit (e) { this.submit.emit (e); }
}
