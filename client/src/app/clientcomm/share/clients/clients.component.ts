import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'fx-client-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  @Input() clients = [];
  @Input() serverData = {} as any;
  @Input() master = {} as any;
  @Output() onResetShare = new EventEmitter();
  me =  {} as any;
  constructor() { }

  ngOnInit(): void {
   
  }
  resetShare($event) {
    this.onResetShare.emit($event);
  }
  orderedClients() {
    let meIndex = this.clients.findIndex(c => c.client === this.serverData.client);
    let masterIndex = this.clients.findIndex(c => c.role === 'master');
    let me, master;

    if(meIndex >= 0) {
      me = this.clients.splice(meIndex, 1);
    }
    if(masterIndex >=0) {
      master = this.clients.splice(masterIndex, 1);
    }
    if(master) {
      this.clients.unshift(master);
    }
    if(me) {
      this.clients.unshift(me);
      this.me = me;
    }
    return this.clients; 
  }
  

}
