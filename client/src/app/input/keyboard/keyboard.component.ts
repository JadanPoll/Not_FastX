import { Component, OnInit, 
  ViewEncapsulation, HostListener, 
  ViewChild, ElementRef, ChangeDetectorRef,
  Output, EventEmitter,

} from '@angular/core';
import Keyboard from "simple-keyboard";
import Codes from "./codes";
import { KeyboardInputService } from "../../starnet";
//import * as Layouts from "./layouts";
import * as Layouts from "./layouts";
import { InputVisibilityService } from '../input-visibility.service';
import { TouchService } from '../../screen/touch.service';


export enum SIZES {
  MINI,
  COMPACT,
  FULL
}

enum Types {
    keyboard = 'kb',
    keypad = 'kp',
    full = 'full',
    mouse = 'mouse',
    min = 'min',
}

@Component({
  selector: 'fx-client-virtual-keyboard',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  value = "";
  keyboard: Keyboard;
  numpad: Keyboard;
  mods = [] as Array<string>;
  caps = false;
  numlock = false;
  sizes = SIZES;
  size: SIZES;
  showKeyboard = false;
  layouts;
  layoutNames;
  touch;
  touch$;
  @Output () close = new EventEmitter ();
  constructor(private kb: KeyboardInputService, 
    private cdr: ChangeDetectorRef, 
    private vis: InputVisibilityService,
    private ts: TouchService) { }
  vk = 'qwerty';
  types = Types;
  keyType = Types.keyboard;
  t;
  ngOnInit() {
    let l = Layouts;
    Object.keys (l).forEach (c => {
      l[c].caps = l [c].default.map (a => { 
        let myc = a.split (" ");
        myc = myc.map (m =>  m.length === 1 ? m.toUpperCase () : m);
        return myc.join (" ");
      });
    });
    this.layouts = l;
    this.layoutNames = Object.keys (this.layouts);
  
  }
  ngOnDestroy () {
    this.touch$.unsubscribe ();
  }
  @ViewChild ('keypad', {static: false}) extraKeys: ElementRef; 
  @ViewChild ('keyboard', {static: false}) keyboardKeys: ElementRef; 
  @HostListener ("window:resize", ['$event.target']) onResize (win) {
    this.doResize (win);
  }
  @HostListener ("document:click", ['$event.target']) clickAway (tar) {
    let t = tar.closest ('.keyboardContainer');
    if (t) return;
   // this.close.emit ();
  }
  doResize (win) {
    clearTimeout (this.t);
    this.t = setTimeout (() => {
      this.setSizeByWidth (win.innerWidth)
    }, 50);
    //set keyboard;
  }
  showInput () {
    this.keyType = this.types.full;
    this.doResize (window);
  }
  setSizeByWidth (width) {
      if (this.keyType && this.showFull ()) return this.changeType (this.keyType);
      if (this.keyType !== this.types.full) return this.changeType (this.keyType);;
      this.keyType = this.showFull () ?  this.types.full : this.types.keyboard;
      this.changeType (this.keyType);
 
  }
  closeKeyboard () {
    this.vis.setKeyboard (false);
  }
  showFull () {
    return  window.innerWidth > 1024;
  }
  ngAfterViewInit () {
    this.touch$ = this.ts.subscribe ((d) => {
      this.touch = d;
      this.keyType = this.types.min;
      this.doResize (window);
    });
    this.doResize (window);
    let opts = {
      physicalKeyboardHighlight: true,
      syncInstanceInputs: true,
      mergeDisplay: true,
      theme: "simple-keyboard hg-theme-default hg-layout-default",
     // debug: true,
      onChange: input => this.onChange (input),
      onKeyPress: button => this.onKeyPress (button),
      display: {
        "{escape}": "esc ⎋",
        "{tab}": "tab ⇥",
        "{backspace}": "backspace ⌫",
        "{enter}": "enter ↵",
        "{capslock}": "caps lock ⇪",
        "{shiftleft}": "shift ⇧",
        "{shiftright}": "shift ⇧",
        "{controlleft}": "ctrl ⌃",
        "{controlright}": "ctrl ⌃",
        "{altleft}": "alt ⌥",
        "{altright}": "alt ⌥",
        "{metaleft}": "cmd ⌘",
        "{metaright}": "cmd ⌘",
        "{space}": "Space",
        "{f1}": "F1",
        "{f2}": "F2",
        "{f3}": "F3",
        "{f4}": "F4",
        "{f5}": "F5",
        "{f6}": "F6",
        "{f7}": "F7",
        "{f8}": "F8",
        "{f9}": "F9",
        "{f10}": "F10",
        "{f11}": "F11",
        "{f12}": "F12",
      }
    }
     this.keyboard = new Keyboard ('.simple-keyboard-main', {
       ...opts,
       layout: this.layouts [this.vk]
     });
     
    let keyboardControlPad = new Keyboard(".simple-keyboard-control", {
      ...opts,
      layout: {
        default: [
          "{prtscr} {scrolllock} {pause}",
          "{insert} {home} {pageup}",
          "{delete} {end} {pagedown}"
        ]
      }
    });

    let keyboardArrows = new Keyboard(".simple-keyboard-arrows", {
      ...opts,
      layout: {
        default: ["{arrowup}", "{arrowleft} {arrowdown} {arrowright}"]
      }
    });

    this.numpad  = new Keyboard(".simple-keyboard-numpad", {
      ...opts,
      onKeyPress: button => {
        let c = (Codes [this.getNumpadCode (button)] || {}).scancode;
        if (!c) return;
        if (button !== "{numlock}") { 
          this.kb.down ({ id: c });
          this.kb.up ({ id: c });
          return;
        }
        this.numlock = !this.numlock;
        this.numpad [this.numlock ? 'addButtonTheme' : 'removeButtonTheme'] (button, 'modifier-enabled');
        this.numpad.setOptions ({ layoutName: this.numlock ? "default" : "shift"});
        this.kb.down ({ id: c });
        this.kb.up ({ id: c })
      },
      layout: {
        default: [
          "{numlock} {numpaddivide} {numpadmultiply}",
          "{numpad7} {numpad8} {numpad9}",
          "{numpad4} {numpad5} {numpad6}",
          "{numpad1} {numpad2} {numpad3}",
          "{numpad0} {numpaddecimal}"
        ],
        shift: [
          "{numlock} {numpaddivide} {numpadmultiply}",
          "{home} {arrowup} {pageup}",
          "{arrowleft} {begin} {arrowright}",
          "{end} {arrowdown} {pagedown}",
          "{insert} {delete}"
        ]
       
      },
      display: {
        "{begin}": "begin"
      }
     
    });
    this.numpad.setOptions ({ layoutName: this.numlock ? "default" : "shift"});
    let keyboardNumPadEnd = new Keyboard(".simple-keyboard-numpadEnd", {
      ...opts,
      layout: {
        default: ["{numpadsubtract}", "{numpadadd}", "{numpadenter}"]
      }
    });
  }
  
  onChange (input: string) {
    //console.log ('change', input)
  }
  onKeyPress (button: string) {
    
    this.handleMods (button);
    this.handleShift (button);
    if (this.isMod (button)) return;
    let c = this.getCode (button);
    this.kb.down ({ id: c });
    this.kb.up ({ id: c })
    if (!this.mods.length) return;
    this.clearMods ();
  }
  changeType (t) {
    switch (t) {
      case this.types.keyboard:
        this.keyboardKeys.nativeElement.style.display = 'inline-block';
        this.extraKeys.nativeElement.style.display = 'none';
        this.cdr.detectChanges ();
        return;
      case this.types.keypad:
        this.keyboardKeys.nativeElement.style.display = 'none';
        this.extraKeys.nativeElement.style.display = 'flex';
        this.cdr.detectChanges ();
        return;
      case this.types.full:
        this.keyboardKeys.nativeElement.style.display = 'inline-block';
        this.extraKeys.nativeElement.style.display = 'flex';
        this.cdr.detectChanges ();
        return;
      case this.types.mouse:
        this.keyboardKeys.nativeElement.style.display = 'none';
        this.extraKeys.nativeElement.style.display = 'none';
        this.cdr.detectChanges ();
        return;
      default:
        this.keyboardKeys.nativeElement.style.display = 'none';
        this.extraKeys.nativeElement.style.display = 'none';
        this.cdr.detectChanges ();
        if (this.touch) return;
        this.closeKeyboard ();
        return;
    }
  }

  onInputChange  (event: any) {
   // this.keyboard.setInput(event.target.value);
  };

  handleShift  (button) {
    let shifts = ["{shift}", "{shiftleft}", "{shiftright}", "{capslock}"];
    if (button === "{capslock}") {
      this.caps = !this.caps;
      this.keyboard [this.caps ? 'addButtonTheme' : 'removeButtonTheme'] (button, 'modifier-enabled');
    }
    if (shifts.indexOf (button) < 0) return;
    let currentLayout = this.keyboard.options.layoutName;
    if (this.caps) {
      this.keyboard.setOptions({
        layoutName: 'caps'
      });
      return;
    }
    let shiftToggle = currentLayout === "default" ? "shift" : "default";
    if (shifts.filter (c => this.mods.indexOf (c) >= 0).length)  shiftToggle = "shift";
    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
    
  }
  changeLayout (vk) {
    this.vk = vk;
    this.keyboard.setOptions({
      layout: this.layouts [this.vk]
    });
  }
  handleMods (button) {
    if (!this.isMod (button)) return;
    let i = this.mods.indexOf (button);
    i < 0 ? this.mods.push (button) : this.mods.splice (i,1);
    this.keyboard [i < 0 ? 'addButtonTheme' : 'removeButtonTheme'] (button, 'modifier-enabled');

    this.kb [i < 0 ? 'down' : 'up'] ({
      id: this.getCode (button)
    });
  }
  showMouse () {
    return this.keyType === this.types.mouse;
  }
  clearMods () {
    let m
    while (m = this.mods.pop ()) {
      this.kb.up ({
        id: this.getCode (m)
      });
      this.keyboard.removeButtonTheme (m, 'modifier-enabled');
    }
    this.keyboard.setOptions ({
      layoutName: this.caps ? "shift" : "default"
    });
  }
  isMod (button) {
    switch (button) {
      case "{shift}":
      case "{shiftleft}":
      case "{shiftright}":
 //       break;
      case "{altleft}":
      case "{altright}":
  //      break;
      case "{controlleft}":
      case "{controlright}":
 //       break;
      case "{metaleft}":
      case "{metaright}":
        return true;
    }
  }
  getCode (button) {
    if (Codes [button]) return Codes [button].scancode;
    let currentLayout = this.layouts [this.vk] [this.keyboard.options.layoutName];
    let m, n;
    for (let i = 0; i < currentLayout.length; i++) {
      n = (currentLayout [i].split (" ")).findIndex (c => c === button);
      if (n < 0) continue;
      m = i;
      break;
    }
    if (n < 0 || m === currentLayout.length) return;
    let b = (this.layouts ["qwerty"] ['default'] [m].split (" "))[n];
    return Codes [b].scancode;
  }
  getNumpadCode (button) {
    switch (button) {
      case "{home}": return "{numpad7}";
      case "{arrowup}": return "{numpad8}";
      case "{pageup}": return "{numpad9}";
      case "{arrowleft}": return "{numpad4}";
      case "{arrowright}": return "{numpad6}";
      case "{arrowleft}": return "{numpad4}";
      case "{end}": return "{numpad1}";
      case "{arrowdown}": return "{numpad2}";
      case "{pagedown}": return "{numpad3}";
      case "{delete}": return "{numpaddecimal}";
      case "{insert}": return "{numpad0}";
      case "{begin}": return "{numpad5}";
      default: return button;
    }
  }
   

}
