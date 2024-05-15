import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { userComponent } from './employees/user.component';
import { ordersComponent } from './orders/orders.component';

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
      path: 'employees',
      component: userComponent,
      data: { breadcrumb: 'User' },
    },
    {
      path: 'orders',
      component: ordersComponent,
      data: { breadcrumb: 'Orders' },
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
