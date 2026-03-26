import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { SubmitComponent } from "@Common/events";
import { Share } from "@Common/api/share";
import { NotifyService, Errors } from '@Common/notify';



@Component({
  selector: 'fx-session-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent extends SubmitComponent implements OnInit {
  @Input () set session(s) { 
    this._session = s;
    this.form.patchValue({ _id: this._session.id });

   
    Share.load({ id: this._session.id}).then(d => {
      this.form.patchValue(d);
      this.sharingLink = new URL(location.href + '../client/guest;id=' + this._session.id + ';key=' + d.sharingKey);
      this.sharingUsers = this.mergeSharingUsers(d);
      this.cdr.detectChanges();
    }).catch(this._error.bind(this));
  }
  private _error (s, c) {
    this.ns.error ({
      title: Errors.fail ("session", "share"),
      msg: s.message
    });
  }
  _session = {} as any;
  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private ns: NotifyService) { 
    super ();
  }
  addSharer = new FormGroup({} as any);
  form = new FormGroup({} as any);
  sharingUsers = [];
  sharingLink = new URL(location.href);

  opened = 'shareId';
  toggleCollapse(id) {
    this.opened = id;
  }
  isCollapsed(id) {
    return this.opened !==  id;
  }
  copyLink() {
    navigator.clipboard.writeText(this.sharingLink.href);
  }
  types = [
    { name: "User", value: "user" },
    { name: "Group", value: "group" }
  ];

  roles = [
    { name: "Start in Lobby", desc: "User starts in the lobby", value: "lobby" },
    { name: "Automatically Enter", desc: "User automatically enters, must requrest control", value: "viewer" },
    { name: "Make Moderator", desc: "User can assign control to other users", value: "controller" }, 
  ];

  anonUserVisibility = [
    { name: "Restricted", desc: "Only users/groups in the list can share", value: "", },
  //  { name: "Logged In Users", desc: "Logged in users with the link can share", value: "logged-in" },
    { name: "Public", desc: "Anyone with the link can connect", value: "public" }
  ];
  anonUserRoles = [
    { name: "Start in Lobby", desc: "User starts in the lobby", value: "lobby" },
    { name: "Automatically Enter", desc: "User automatically enters, must requrest control", value: "viewer" },
  ];

  getShareTypeVal() {
    return this.addSharer.get("type").value as any;
  }
  setShareTypeVal(r) {
    this.addSharer.patchValue({ type: r });
    this.cdr.detectChanges();
  }
  getShareType(r) {
    return (this.types.find(c => c.value === r ) || {}) as any; 
  }
  getShareObject() {
    
  }
  getShareRoleVal() {
    return this.addSharer.get("role").value as any;
  }
  setShareRoleVal(r) {
    this.addSharer.patchValue({ role: r });
    this.cdr.detectChanges();
  }
  setUserShareRoleVal(u, val) {
    u.role = val;
    let i = this.sharingUsers.findIndex(c => c.name === u.name);
    if(i < 0)
      this.sharingUsers.push(u);
    else 
      this.sharingUsers[i] = u;

    let ug = this.unmergeSharingUsers(this.sharingUsers);
    ug.id = this._session.id;
    Share.update(ug)
    .then(d => {
      this.addSharer.patchValue({ name: "" });
      this.sharingUsers = this.mergeSharingUsers(ug);
      this.cdr.detectChanges();
    }).catch(this._error.bind(this));
  }
  getShareRole(r) {
    return (this.roles.find(c => c.value === r ) || {}) as any; 
  }
  addSharingUser() {
    let u = this.addSharer.value as any;
    let i = this.sharingUsers.findIndex(c => c.name === u.name);
    if(i < 0)
      this.sharingUsers.push(u);
    else 
      this.sharingUsers[i] = u;

    let ug = this.unmergeSharingUsers(this.sharingUsers);
    ug.id = this._session.id;
    Share.update(ug)
    .then(d => {
      this.addSharer.patchValue({ name: "" });
      this.sharingUsers = this.mergeSharingUsers(ug);
      this.cdr.detectChanges();
    }).catch(this._error.bind(this));
    
  }
  removeUser(n) {
    this.sharingUsers = this.sharingUsers.filter(c => c.name !== n);
    let ug = this.unmergeSharingUsers(this.sharingUsers);
    ug.id = this._session.id;
    Share.update(ug)
    .then(d => {
      this.addSharer.patchValue({ name: "" });
      this.sharingUsers = this.mergeSharingUsers(ug);
      this.cdr.detectChanges();
    }).catch(this._error.bind(this));
    
  }
  mergeSharingUsers(d = {} as any) {
    let u = [];
    if(d.users && d.users.length) {
      u = u.concat(
        d.users.map(c => {
          c.type = 'user';
          return c;
        })
      );
    }
    if(d.groups && d.groups.length) {
      u = u.concat(
        d.groups.map(c => {
          c.type = 'group';
          return c;
        })
      );
    }
    return u as any;
  } 
  unmergeSharingUsers(u) {
    let ug = { users: [], groups: [] } as any;
    u.forEach(c => {
      if(c.type === 'user') {
        ug.users.push({ name: c.name, role: c.role });
      } else if(c.type === 'group') {
        ug.groups.push({ name: c.name, role: c.role }); 
      }
    });
    return ug as any;
  }
  ngOnInit() {
 
    this.addSharer = this.fb.group({
      type: ["user"],
      name: [""],
      role: ["viewer"]
    } as any);

    this.form = this.fb.group({
      _id: [""],
      id: [""],
      sharingKey: [""],
      users: [[]],
      groups: [[]],
      public: this.fb.group({
        role: "lobby",
        visibility: "",
      } as any)
    });
    
  }
  ngAfterViewInit () {
  }
  onAddShare() {
   let v =  this.addSharer.value
  }

  getVisibilityObject(r) {
    let role = this.anonUserVisibility.find(c => c.value === r );
    return (role || {}) as any;
  }

  getRoleObject(r) {
    let role = this.anonUserRoles.find(c => c.value === r );
    return (role || {}) as any;
  }
  getAnonRole() {
    return (this.form.get("public").get("role").value) as any;
  }
  getAnonVisibility() {
    return (this.form.get("public").get("visibility").value) as any;
  }

  getAnonForm() {
    return this.form.get("public");
  }
  
  setAnonRole(val) {
    let pub = (this.form.get('public').value) as any;
    pub.role = val;
    Share.update({ id: this._session.id, public: pub  }).then(d => {
      this.form.patchValue({ public: pub });
      this.cdr.detectChanges();
    }).catch(this._error.bind(this))
  }
  setAnonVisibility(val) {
    let pub = (this.form.get('public').value) as any;
    pub.visibility = val;
    

    let key = ((Math.random() + 1).toString(36).substring(2, 17)) + ((Math.random() + 1).toString(36).substring(2, 17));

    Share.update({ 
      id: this._session.id, 
      sharingKey: val ? key : "",
      public: pub  
    }).then(d => {
      this.form.patchValue({ 
        sharingKey: val ? key : "",
        public: pub 
      });
      let r = new URL(location.href);
      let i = r.pathname.indexOf('/client');
      if(i < 0 ) {
        r.pathname = '../client/guest;id=' + this._session.id + ';key=' + key;
      } else {
        let p = r.pathname.substring(0, i);
        r.pathname = p + '/client/guest;id=' + this._session.id + ';key=' + key;
      }
      this.sharingLink = new URL(r.href);
      this.cdr.detectChanges();
    }).catch(this._error.bind(this))
    
  }
  onSubmit (event) {
    this.submit.emit (event);
  } 

  collapseOthers() {

  }
  

}
