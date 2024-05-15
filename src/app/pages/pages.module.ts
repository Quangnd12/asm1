import {NgModule} from '@angular/core';
import {NbMenuModule} from "@nebular/theme";
import {ThemeModule} from '../@theme/theme.module';
import {PagesComponent} from './pages.component';
import {DashboardModule} from './dashboard/dashboard.module';

import {PagesRoutingModule} from './pages-routing.module';
import {PaginatorModule} from "../@theme/components/paginator/paginator.module";

import { userModule } from './userinfo/user.module';
import { productModule } from "./products/product.module";
import { customerModule } from "./customers/customer.module";


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    NbMenuModule,
    PaginatorModule,
    userModule,
    productModule,
    customerModule
  ],
  declarations: [
    PagesComponent,
  ],
  providers: []
})
export class PagesModule { }
