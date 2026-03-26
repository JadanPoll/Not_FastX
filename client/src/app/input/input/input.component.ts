import { Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import { InputVisibilityService } from '../input-visibility.service';
import { SIZES } from "../keyboard/keyboard.component"; 


@Component({
  selector: 'fx-client-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  myInput = {} as any;
  sizes = SIZES;
  inputTypes = {
    keyboard: "Keyboard",
    mouse: "Mouse",
    hide: "Hide"
  };
  cur: string = 'hide';
  constructor(
    private vis: InputVisibilityService,
  ) { }
  @ViewChild ("virtKeyboard", {static: false}) virtualKeyboard: ElementRef;
  @ViewChild ("virtMouse", {static: false}) virtualMouse: ElementRef;
  @ViewChild ("virtKeypad", {static: false}) virtualKeypad: ElementRef;
  @ViewChild ("input", {static: false}) input: ElementRef;
 
  ngOnInit() {
  }
  ngAfterViewInit () {
    this.vis.subscribe (myInput => {
        this.myInput = myInput;
    }); 
  }
  closeKeyboard ($event) {
    this.cur = 'hide';
  }
  showKeyboard () {
    return this.myInput.keyboard;
  }
  showMouse () {
    return this.myInput.mouse;
  }
 
  next (cur) {
    switch (cur) {
      case "keyboard":
        this.vis.setKeyboard (true);
        this.vis.setMouse (false);
        return this.cur = "mouse";
      case "mouse":
        this.vis.setKeyboard (false);
        this.vis.setMouse (true);
        return this.cur = "hide";
      case "hide":
        this.vis.setKeyboard (false);
        this.vis.setMouse (false);
        return this.cur = "keyboard";
    }
  }
  displayNext (cur) {
    switch (cur) {
      case "mouse":
        return  this.inputTypes ["hide"];
      case "hide":
        return this.inputTypes ["keyboard"];
      case "keyboard":
        return this.inputTypes ["mouse"];
    }
  }

}
