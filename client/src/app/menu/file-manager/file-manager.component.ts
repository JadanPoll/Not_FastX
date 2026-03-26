import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'fx-client-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {
  @Input () config = {} as any;
  constructor(private modal: NgbModal) {

  }

  ngOnInit() {
  }
  fm(content) {
    this.modal.open(content, {
      scrollable:true,
      size: 'lg'
    });
    //let u = this.config.url || '../user/file-manager';
    //return window.open (u)
  }
  getH() {
    return (window.innerHeight * 0.8) + 'px';
  }

}
