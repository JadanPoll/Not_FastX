import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpgradeService } from "./upgrade.service";
import { ConfigModule } from '@Common/config';
import { HttpClientJsonpModule } from '@angular/common/http';



@NgModule({
  imports: [
    CommonModule,
    ConfigModule,
    HttpClientJsonpModule,
  ],
  declarations: [],
  exports: [],
  providers:[UpgradeService]
})
export class UpgradeModule {}

