import { Component, OnInit, HostListener } from '@angular/core';
import { NotifyService, POSITION } from "@Common/notify/notify.service";


@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {
  constructor( private ns: NotifyService) { }
  
  ngOnInit() {
  
  }
 
  getPosition () {
    return this.ns.getPosition ();
  }

}
