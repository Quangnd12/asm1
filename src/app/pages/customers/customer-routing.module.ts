import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent} from './customer-list/customer-list.component'
import { CustomerCreateComponent} from './customer-create/customer-create.component'
// import { CustomerDetailComponent} from './customer-detail/customer-detail.component'
import { CustomerEditComponent} from './customer-edit/customer-edit.component'

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent,
  },
  {
    path: 'create',
    component: CustomerCreateComponent,
  },
  // {
  //   path: 'detail/:id',
  //   component: CustomerDetailComponent,
  // },
  {
    path: 'edit/:id',
    component: CustomerEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
