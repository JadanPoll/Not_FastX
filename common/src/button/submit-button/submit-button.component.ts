import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { EmitButtonComponent } from '@Common/button/emit-button/emit-button.component';

@Component({
  selector: 'submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.css']
})
export class SubmitButtonComponent extends EmitButtonComponent implements OnInit {
  constructor (private cdr: ChangeDetectorRef) {
    super ();
  }
  @Input () set text (t) {
    this._text = t;
    this.cdr.markForCheck();
  }
  _text = "Submit";
  ngOnInit() {
  }
  getText () {
    return this._text;
  }

}
