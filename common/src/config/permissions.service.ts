import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ReplaySubject } from "rxjs";
import { User } from "@Common/api/user";

@Injectable()
export class PermissionsConfigService {
  private sub = new ReplaySubject (1);
  constructor ( private http: HttpClient) {
      
  }
  load(base) {
    User.permissions().then(d => {
      this.sub.next(d);
    })
    .catch(e => {
      this.sub.error(e);
    });
  }
  subscribe (d) {
    return this.sub.asObservable ().subscribe (d);
  }
}
