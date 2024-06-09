import { NgModule } from '@angular/core';
import { BreadcrumbModule } from "xng-breadcrumb";
import { NbCardModule } from '@nebular/theme';
import { OrdersCreateComponent } from './orders-create/orders-create.component';
import { OrdersEditComponent } from './orders-edit/orders-edit.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersRoutingModule } from './orders-routing.module';


@NgModule({
  declarations: [
    OrdersCreateComponent,
    OrdersEditComponent,
    OrdersListComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NbCardModule,
    BreadcrumbModule,
  ],

})
export class ordersModule { }
