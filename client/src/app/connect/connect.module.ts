import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityModule } from './security';
import { ConnectService } from "./connect.service";
import { StarnetModule } from '../starnet';

@NgModule({
  imports: [
    CommonModule,
    StarnetModule,
    SecurityModule
  ],
  declarations: [],
  providers: [
    ConnectService
  ]
})
export class ConnectModule { }
