import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SubmitCancelComponent } from "@Common/events";
import { CloseComponent } from "@Common/dialog";

@Component({
  selector: 'app-logged-out',
  templateUrl: './logged-out.component.html',
  styleUrls: ['./logged-out.component.css']
})
export class LoggedOutComponent extends SubmitCancelComponent implements OnInit {

  t: 'You have been logged out';
  info;
  @ViewChild ('footer', {static: false}) close;
  ngOnInit() {

  }
  ngAfterViewInit () {
    this.close.submitButton.text = 'Log In';
  }
  title () {
    return 'You have been logged out';
  }
  getInfo () {
    return typeof this.info === 'object' ? this.info.message : '';
  }
}
