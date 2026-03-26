import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@Common/user/user.service';
import { ConfigModule } from '@Common/config';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [UserService]
})
export class UserModule { }
