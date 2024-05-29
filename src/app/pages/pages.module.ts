import { NgModule } from '@angular/core';
import { NbMenuModule } from "@nebular/theme";
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';

import { PagesRoutingModule } from './pages-routing.module';
import { PaginatorModule } from "../@theme/components/paginator/paginator.module";

import { productModule } from "./products/product.module";
import { customerModule } from "./customers/customer.module";
import { ordersModule } from './orders/order.module';
import { emloyeesModule } from './employees/employees.module';
import { FeedbackModule } from './feedback/feedback.module';
import { StaffComponent } from './staff/staff.component';
import { StaffModule } from './staff/staff.module';

@NgModule({
  imports: [
    StaffModule,
    FeedbackModule,
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    NbMenuModule,
    PaginatorModule,
    productModule,
    customerModule,
    ordersModule,
    emloyeesModule
  ],
  declarations: [
    PagesComponent,
  ],
  providers: []
})
export class PagesModule { }
