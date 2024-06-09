import { PaginatorComponent } from './../../@theme/components/paginator/paginator.component';
import { NgModule } from '@angular/core';
import { BreadcrumbModule } from "xng-breadcrumb";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule } from '@nebular/theme';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { FeedbackCreateComponent } from './feedback-create/feedback-create.component';
import { FeedbackEditComponent } from './feedback-edit/feedback-edit.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { PaginatorModule } from 'app/@theme/components/paginator/paginator.module';
@NgModule({
  imports: [
    PaginatorModule,
    NgIf,
    FeedbackRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    Ng2SmartTableModule,
    NbCardModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  declarations: [
     
    FeedbackCreateComponent,
    FeedbackEditComponent,
    FeedbackListComponent
  ],
})

export class FeedbackModule { }
