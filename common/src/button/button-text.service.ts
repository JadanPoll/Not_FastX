import { Injectable } from '@angular/core';
import { BUTTONS } from "@Common/button/constants";

@Injectable()
export class ButtonTextService {

  constructor() { }

  ok (type: BUTTONS): string {
    switch (type) {
      case BUTTONS.OKCANCEL:
      case BUTTONS.OK:
        return 'Ok';
      case BUTTONS.SUBMITCANCEL:
        return 'Submit';
      case BUTTONS.YESNO:
        return 'Yes';
      default:
        return '';
    }
  }
  cancel (type: BUTTONS): string {
    switch (type) {
      case BUTTONS.OKCANCEL:
      case BUTTONS.SUBMITCANCEL:
        return 'Cancel';
      case BUTTONS.YESNO:
        return 'No';
      default: 
        return '';
    }
  }
}
