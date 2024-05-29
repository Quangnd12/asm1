import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { ordersComponent } from './orders/orders.component';
import { employeesComponent } from './employees/employees.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { StaffComponent } from './staff/staff.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      data: { breadcrumb: 'Dashboard' },
    },
    {
      path: 'products',
      component: ProductsComponent,
      data: { breadcrumb: 'Product' },
    },
    {
      path: 'customers',
      component: CustomersComponent,
      data: { breadcrumb: 'Customer' },
    },
    {
      path: 'employees',
      component: employeesComponent,
      data: { breadcrumb: 'Employees' },
    },
    {
      path: 'orders',
      component: ordersComponent,
      data: { breadcrumb: 'Orders' },
    },
    {
      path: 'feedback',
      component: FeedbackComponent,
      data: { breadcrumb: 'Feedback' },
    },
    {
      path: 'staff',
      component: StaffComponent,
      data: { breadcrumb: 'staff' },
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
