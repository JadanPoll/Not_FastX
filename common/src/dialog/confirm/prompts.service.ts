import { Injectable } from '@angular/core';

@Injectable()
export class PromptsService {

  constructor() { }
  confirmDelete (name: string, plural = false) {
    return this.confirm (name, "delete", plural);
  }
  confirm (name: string, action: string, plural = false) {
    return ['Are you sure you want to',
            action,
           (plural ? 'these' : 'this'),
           name + (plural ? 's' : '') + '?',
   ].join (' ');
  }
  formatObjects (obj = [], mapper = (c => c)) {
      return '<ul class="list-group border-0">' + obj.map (c => '<li class="list-group-item border-0">' + mapper (c) + '</li>').join ('') + '</ul>'
  }
}
