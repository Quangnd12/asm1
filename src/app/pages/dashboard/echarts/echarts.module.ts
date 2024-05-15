import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { EchartsComponent } from './echarts.component';

@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule
  ],
  declarations: [
    EchartsComponent
  ],
  exports: [
    EchartsComponent
  ]
})
export class EchartsModule { }
