import { NgModule } from '@angular/core';
import { employeesComponent } from './employees.component';
import { BreadcrumbModule } from "xng-breadcrumb";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule } from '@nebular/theme';


@NgModule({
  imports: [
    BreadcrumbModule,
    Ng2SmartTableModule,
    NbCardModule
  ],
  declarations: [
    employeesComponent
  ],
})
export class emloyeesModule { }
