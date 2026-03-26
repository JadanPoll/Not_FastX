import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { WindowRef } from '@Common/browser';
import { FxShareService } from '../fx-share.service';


@Component({
  selector: 'fx-share-guest-login',
  templateUrl: './guest-login.component.html',
  styleUrls: ['./guest-login.component.css']
})
export class GuestLoginComponent implements OnInit {
  @Input() resetShare = false;
  @Output() onHelloSent = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  form: FormGroup;
  constructor(private fb: FormBuilder, private shareService: FxShareService, private wref: WindowRef ) { }
  private _disabled = false;
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", Validators.email]
    });
    this.form.patchValue({ name: this.wref.localStorage.displayName || "" });
  }
  get name() {
    return this.form.get("name");
  } 
  get email() {
    return this.form.get("email");
  }
  get disabled() {
    return this._disabled || this.name.invalid;
  }
  connectVal() {
    return this.resetShare ? "Update" : "Connect";
  }
  cancel() {
    this.resetShare = false; 
  }
  submit() {
    this.form.markAllAsTouched();
    if(this.form.invalid) {
      return;
    }
    this._disabled = true;
    let v = this.form.value;
    this.wref.localStorage.displayName = v.name;
    this.shareService.hello(v);
    this.onHelloSent.emit(v);
    this.resetShare = true;

  }

}
