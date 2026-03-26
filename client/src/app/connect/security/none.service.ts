import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { NoneService as NS } from '../../starnet';

@Injectable()
export class NoneService {
  id;
  private sub$;
  constructor(private sec: NS) {
    this.sub$ = this.sec.getSubject ().subscribe (this.handle.bind (this));
  }
   private handle (d) {
      this.sec.send ({
        username: 'demo', 
        password: 'none'
      });
   }
}
