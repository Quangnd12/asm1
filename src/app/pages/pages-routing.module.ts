import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
// import { FeedbackComponent } from './feedback/feedback.component';
// import { StaffComponent } from './staff/staff.component';

// import { ordersComponent } from './orders/orders.component';
// import { employeesComponent } from './employees/employees.component';

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
      loadChildren: () => import('./products/product.module').then(m => m.productModule),
      data: { breadcrumb: 'Product' },
    },
    {
      path: 'customers',
      loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule),
      data: { breadcrumb: 'Customer' },
    },
    {
      path: 'employees',
      loadChildren: () => import("./employees/employees.module").then(m => m.emloyeesModule),
      data: { breadcrumb: 'Employees' },
    },
    {
      path: 'orders',
      loadChildren: () => import("./orders/order.module").then(m => m.ordersModule),
      data: { breadcrumb: 'Orders' },
    },
    {
      path: 'feedback',
      loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackModule),
      data: { breadcrumb: 'Feedback' },
    },
   {
      path: 'staff',
      loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule),
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
