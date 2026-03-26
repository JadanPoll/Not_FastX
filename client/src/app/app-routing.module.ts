import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreenComponent, ScreenModule } from "./screen";

const appRoutes: Routes = [
  { path: 'connect', component: ScreenComponent },
  { path: 'shortcut', component: ScreenComponent },
  { path: 'share', component: ScreenComponent },
  { path: 'custom', component: ScreenComponent },
  { path: 'guest', component: ScreenComponent },
  { path: '', component: ScreenComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
] 


@NgModule({
  imports: [
    ScreenModule,
    RouterModule.forRoot (appRoutes),
  ],
  exports: [ ]

})
export class AppRoutingModule { }
