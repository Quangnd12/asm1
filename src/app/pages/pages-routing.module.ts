import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import { userComponent } from './userinfo/user.component';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component' ;

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      data: {breadcrumb: 'Dashboard'},
    },
    {
      path: 'userinfo',
      component: userComponent,
      data: {breadcrumb: 'User'},
    },
    {
      path: 'products',
      component: ProductsComponent,
      data: {breadcrumb: 'Product'},
    },
    {
      path: 'customers',
      component: CustomersComponent,
      data: {breadcrumb: 'Customer'},
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
