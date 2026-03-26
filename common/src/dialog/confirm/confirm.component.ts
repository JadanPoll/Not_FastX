import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dialog-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  @Input () title = "";
  @Input () text = "";
  constructor() { }

  ngOnInit() {
  }

}
