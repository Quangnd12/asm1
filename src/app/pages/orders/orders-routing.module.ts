import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersCreateComponent } from './orders-create/orders-create.component';
import { OrdersEditComponent } from './orders-edit/orders-edit.component';
import { OrdersListComponent } from './orders-list/orders-list.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersListComponent,
  },
  {
    path: 'create',
    component: OrdersCreateComponent,
  },
  {
    path: 'edit/:id',
    component: OrdersEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
