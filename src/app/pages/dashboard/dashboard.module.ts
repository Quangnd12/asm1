import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DashboardComponent } from './dashboard.component';
import { EchartsComponent } from './echarts/echarts.component';

@NgModule({
  declarations: [
    DashboardComponent,
    EchartsComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    Ng2SmartTableModule
  ]
})
export class DashboardModule { }
