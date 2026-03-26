import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";

import { FxShareService } from '../../fx-share.service';

@Component({
  selector: 'fx-client-client-user',
  templateUrl: './client-user.component.html',
  styleUrls: ['./client-user.component.css']
})
export class ClientUserComponent implements OnInit {
  @Input() master =  {} as any;
  @Input() serverData = {} as any;
  @Input() client = {} as any;
  @Input() me;
  @Output() onResetShare = new EventEmitter();

  isOpen = false;
  showMenu = false;
  editing = false;
  form: FormGroup
  constructor(private fb: FormBuilder, private ss: FxShareService) { }

 
  ngOnInit(): void {
    this.form = this.fb.group({
      name: [""]
    });
  }
  submitForm() {
    this.editName(this.form.get("name").value);
    this.endEditName();
  }
  displayExtras() {
    let arr = [this.isMe() ? 'me' : '',
    this.isMaster() ? 'owner' : '',
    this.isControlling() ? 'controlling' : '',
    this.client.role === 'controller' ? 'moderator' : '',
    ].filter(c => c);

    return arr.length ? '(' + arr.join(',')+ ')' : '';
  }
  clientEntries() {
    return Object.entries(this.client);
  }
  toggleOpen($event) {
    this.isOpen = $event;
  }
  extraIsOpen() {
    return true;
   return this.isOpen;
  }
  clientName(full) {
    let n = (this.client.name || this.client.login || ("CLIENT_ID_" + this.client.client ));
    if(n.length > 15)
      return n.substring(0,12) + '...';
    return n;
  }
  editName(n) {
    this.ss.updateClient([
      { client: this.client.client, name: n }
    ]);
  }
  editStatus(status) {
    this.ss.updateClient([
      { client: this.client.client, status: status}
    ]);
  }
  editRole(r) {
    this.ss.updateClient([
      { client: this.client.client, role: r }
    ]); 
  }
  disconnect() {
    this.ss.disconnect([this.client.client], "Disconnected by moderator");
  }
  beginEditName() {
    this.editing = true;
    this.onResetShare.emit(true);

  }
  endEditName() {
    this.editing = false;
  }
  menuItems() {
    return [
      { name: "Edit Name", 
        onclick: this.beginEditName.bind(this),
        hide: () => { return !this.showEditName(); }
      },
      { name: 'Make Moderator',
        onclick: this.editRole.bind(this, 'controller'),
        hide: () => { return !this.showChangeRole() || (['master', 'controller'].indexOf(this.client.role) >= 0);}
      },
      { name: 'Make Viewer',
        onclick: this.editRole.bind(this, 'viewer'),
        hide: () => { return !this.showChangeRole() || (['master', 'viewer', 'lobby'].indexOf(this.client.role) >= 0); }
      },
      { name: 'Disconnect',
        onclick: this.disconnect.bind(this),
        hide: () => { return !this.showDisconnect(); } 
      }
    ].filter(c => !c.hide())
  }
  hideStatus() {
    switch (this.serverData.role) {
      case 'master':
       // return this.serverData.client === this.client.client;  
      case 'controller':
       // return (this.client.role !== 'master') || (this.serverData.client === this.client.client);
       return false;
      default:
        return true;
    } 
  }
  show() {
    return this.menuItems().length && this.showMenu;
  }
  showAdmit() {
    switch(this.serverData.role) {
      case 'master':
      case 'controller':
        return this.showMenu;
      default: 
        return false;
    }
  }
  showControl() {
    if(!this.showMenu)
      return false;
    switch(this.serverData.role) {
      case 'master':
        return true;
      case 'controller':
        return true;
      default:
        return false;
    }
  }
  showDisconnect() {
    switch (this.me.role) {
      case 'master':
        return this.client.role != 'master';  
      case 'controller':
        //return (this.client.role !== 'master') && (this.serverData.client !== this.client.client);
      default:
        return false;
    }
  }
  showEditName() {
    switch (this.serverData.role) {
      case 'master':
        return true;
      case 'controller':
          return true;
        //return this.client.role !== 'master';
      default:
        return this.client.client === this.serverData.client;
    } 
  }
  showChangeRole() {
    
    switch (this.me.role) {
      case 'master':
        return (this.client.role !== 'master');
      case 'controller':
        //return this.client.role !== 'master';
        
      default:
        return false;
    }
  }
  showChangeStatus() {
    switch(this.serverData.role) {
      case 'master':
          return true;
      case 'controller':
          return true;
    }
  }
  enter() {
    this.showMenu = true;
  }
  leave() {
    this.showMenu = false;
  }
  isMaster() {
    return this.client.role === 'master';
  }
  isOrganizer() {
    return this.client.role === 'controller';
  }
  isMe() {
    return this.serverData.client === this.client.client;
  }
  isControlling() {
    return this.client.status === 'input';
  }
  inLobby() {
    return this.client.status === 'lobby';
  }

}
