import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { TableModule } from  'primeng/table';
import {ButtonModule} from 'primeng/button';
import { ContainerDirective } from './grid/container.directive';
import { GridCellComponent } from './grid/cell/grid-cell.component';
import { ComponentLoaderModule } from '@Common/component-loader';
import { NgsContenteditableModule } from '@ng-stack/contenteditable';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    NgsContenteditableModule,
    ComponentLoaderModule,
  ],
  //directives:[ContainerDirective],
  declarations: [GridComponent, ContainerDirective],
  exports: [GridComponent],
})
export class GridModule { }
