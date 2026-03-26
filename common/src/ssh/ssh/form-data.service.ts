import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  _form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.reset();
  }
  reset() {
    this._form = this.fb.group ({
      username: ['', Validators.required],
      password: [''],
      usePK: [false],
      admin: [false],
      serverId: [''],
      banner: [true], 
      selectServer:[true],
      httpOnly:[true],
    });
  }
  patchValue(d) {
    this._form.patchValue(d);
  }
  get value() {
    return this._form.value;
  }
  get form() {
    return this._form;
  }

}
