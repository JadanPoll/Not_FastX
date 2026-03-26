import { Injectable } from '@angular/core';
import { PasswordService } from "./password.service";
import { NoneService } from "./none.service";
@Injectable()
export class SecurityService {

  constructor(private pw: PasswordService, private none: NoneService) { }

}
