import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffCreateComponent } from './staff-create/staff-create.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffEditComponent } from './staff-edit/staff-edit.component';

// import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: StaffListComponent,
  },
  {
    path: 'create',
    component: StaffCreateComponent,
  },
  // {
  //   path: 'detail/:id',
  //   component: ProductDetailComponent,
  // },
  {
    path: 'edit/:id',
    component: StaffEditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
