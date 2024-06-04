import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {BreadcrumbModule} from "xng-breadcrumb";
import { NbCardModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductsRoutingModule } from './products-routing.module';


@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NbCardModule,
    BreadcrumbModule
  ],
  declarations: [
    ProductListComponent,
    ProductCreateComponent,
    ProductEditComponent
  ],
})
export class productModule { }
