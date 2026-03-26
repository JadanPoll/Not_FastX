import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { KeyboardService, IframeService } from "../../starnet";
import { InputVisibilityService } from "../../input";
import Layouts from "./keyboard-layouts";

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  sub$;
  form$;
  vis$;
  form: FormGroup;
  layouts;
  selected;
  onscreenKeyboard = false;
  @Input () touch;
  constructor(
    private modalService: NgbModal, 
    private kb: KeyboardService,
    private fb: FormBuilder,
    private frame: IframeService,
    private vis: InputVisibilityService) { 
  }

  ngOnInit() {
    this.layouts = Layouts;
    this.form = this.initForm ();
    this.sub$ = this.kb.getSubject ().subscribe (this.handle.bind (this));
    this.form$ = this.form.valueChanges.subscribe (this.onChange.bind (this));
    this.vis$ = this.vis.subscribe (d => {
      if (this.onscreenKeyboard === d.keyboard) return;
      this.onscreenKeyboard = d.keyboard;
    });
  }
  ngOnDestroy () {
    this.sub$.unsubscribe ();
    this.form$.unsubscribe ();
    this.vis$.unsubscribe ();
  }
  private initForm () {
    return this.fb.group ({
      layout: [0x00000409],
      type: [this.isMac() ? 0x00000008 : 0x00000004]
    });
  }
  private handle (d) {
    if (this.form.get ('layout').value === d.layout &&
    this.form.get ('type').value === d.type ) { return }
    if (!this.layouts.layouts.find (c => c.id === d.layout)) { return }
    if (!this.layouts.types.find (c => c.id === d.type)) { return }
    this.form.patchValue (d);
  }
  private onChange (d) {
    this.kb.send (d);
  }
 
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.frame.focus ();
     }, (reason) => {
      this.frame.focus ();
     });
  }
  onKeyboardChange ($event) {
      this.vis.setKeyboard (this.onscreenKeyboard);
  }
  isMac() {
     return (navigator.appVersion.indexOf("Mac")!=-1); 
  }

}
