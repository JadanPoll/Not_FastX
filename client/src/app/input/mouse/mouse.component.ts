import { Component, OnInit, HostListener } from '@angular/core';
import { MouseInputService } from '../../starnet/';
import { TouchMouseService } from '../touchmouse.service';

export enum BUTTONS {
	LEFT = 0x01,
	MIDDLE = 0x04,
	RIGHT = 0x02,
	BACK = 0x08,
	FORWARD = 0x10
}

@Component({
  selector: 'fx-client-virtual-mouse',
  templateUrl: './mouse.component.html',
  styleUrls: ['./mouse.component.scss']
})
export class MouseComponent implements OnInit {
  press = 'click';
  holding = false;
  pressedButtons = {
    l: false,
    m: false,
    r: false
  };
  pos$;
  pos = [0,0];
  constructor(private m: MouseInputService, 
    private t: TouchMouseService) {}

  ngOnInit() {
    this.pos$ = this.t.subscribe (e => {
      //console.log (e)
     });
  }
  ngOnDestroy () {
    this.pos$.unsubscribe ();
    this.m.setButton (null);
  }
  wheel (down = false) {
    this.m.wheel ({
      pos: this.pos,
      delta: down ? -120 : 120
    });
  }
  click (btn) {
      this.pressedButtons [btn] = !this.pressedButtons [btn];
      this.m.setButton ({ flags: this.getFlags () })
  }
  onPressChange (p) {
    this.holding = (p === 'hold');
  }
  getFlags (buttons?) {
    return (this.pressedButtons ['l'] ? BUTTONS.LEFT : 0x00) |
            (this.pressedButtons ['m'] ? BUTTONS.MIDDLE : 0x00) |
            (this.pressedButtons ['r'] ? BUTTONS.RIGHT : 0x00) 
  }
  isPressed (b) {
    return this.pressedButtons [b];
  }

}
