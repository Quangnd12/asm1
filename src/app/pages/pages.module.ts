import { NgModule } from '@angular/core';
import { NbMenuModule } from "@nebular/theme";
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { userModule } from './employees/user.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PaginatorModule } from "../@theme/components/paginator/paginator.module";
import { ASMComponent } from './asm/asm.component';
import { ordersModule } from './orders/order.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    NbMenuModule,
    PaginatorModule,
    userModule,
    ordersModule
  ],
  declarations: [
    PagesComponent,
    ASMComponent,
  ],
  providers: []
})
export class PagesModule { }
