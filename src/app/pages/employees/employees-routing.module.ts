import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesCreateComponent } from './employees-create/employees-create.component';
import { EmployeesEditComponent } from './employees-edit/employees-edit.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesListComponent,
  },
  {
    path: 'create',
    component: EmployeesCreateComponent,
  },
  {
    path: 'edit/:id',
    component: EmployeesEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
