import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordService, PasswordConfig, passwordConfigFactory, passwordServiceFactory } from './password.service';
import { NoneService, NoneConfig, noneServiceFactory, noneConfigFactory } from './none.service';
import { eventServiceFactory, IframeService, IframeModule } from '../iframe';
@NgModule({
  imports: [
    CommonModule,
    IframeModule,
  ],
  declarations: [],
  providers: [
    { provide: PasswordConfig, useFactory: passwordConfigFactory, deps: [IframeService] },
    { provide: NoneConfig, useFactory: noneConfigFactory, deps: [IframeService] },
    { provide: PasswordService, useFactory: passwordServiceFactory, deps: [PasswordConfig] },
    { provide: NoneService, useFactory: noneServiceFactory, deps: [NoneConfig] },
  ]
})
export class SecurityModule { }
