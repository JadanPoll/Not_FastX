import {Injectable} from '@angular/core';

export function getWindow(): any {
  // return the native window obj
  return window;
}


@Injectable()
export class WindowRef extends Window {}
