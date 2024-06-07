import { NgModule } from '@angular/core';
import { BreadcrumbModule } from "xng-breadcrumb";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule } from '@nebular/theme';
import { StaffCreateComponent } from './staff-create/staff-create.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffEditComponent } from './staff-edit/staff-edit.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { StaffRoutingModule } from './staff-routing.module';

@NgModule({
  imports: [
    NgIf,
    StaffRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    Ng2SmartTableModule,
    NbCardModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  declarations: [
    StaffEditComponent,
    StaffCreateComponent,
    StaffListComponent ,
  ],
})
export class StaffModule { }
