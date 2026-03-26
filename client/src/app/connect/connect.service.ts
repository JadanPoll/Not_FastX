import { Injectable } from '@angular/core';
import { ConnectService as SnConnect } from "../starnet";
import { PasswordService } from './security/password.service';
import { NoneService } from "./security/none.service";
@Injectable()
export class ConnectService {
  public connection:any;
  constructor(private conn: SnConnect, private pw: PasswordService, private none: NoneService) { }
  connect (id, params, connection) {
    this.pw.id = id;
    this.connection = connection;
    this.conn.send ({ id: id, options: params, connection: connection});
  }
}
