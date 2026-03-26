import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ReplaySubject } from "rxjs";
import { User } from "@Common/api/user";
@Injectable()
export class UserConfigService {
  private sub = new ReplaySubject (1);
  constructor ( private http: HttpClient) {
      
  }
  setRootPath(p) {
    User.api.setRootPath(p);
  }
  load() {
    User.me().then(d => {
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
