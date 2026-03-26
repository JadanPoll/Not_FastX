import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityService } from './security.service';
import { PasswordService } from "./password.service";
import { NoneService } from "./none.service";
import { SecurityModule as SNSecure} from '../../starnet/security';

@NgModule({
  imports: [
    CommonModule,
    SNSecure,
  ],
  declarations: [],
  providers: [
    SecurityService,
    PasswordService,
    NoneService
  ]
})
export class SecurityModule { }
