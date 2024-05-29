import { FeedbackComponent } from './feedback.component';
import { NgModule } from '@angular/core';
import { BreadcrumbModule } from "xng-breadcrumb";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule } from '@nebular/theme';
import { DialogConfirmComponent } from 'app/@theme/components/dialog-confirm/dialog-confirm.component';


@NgModule({
  imports: [
    BreadcrumbModule,
    Ng2SmartTableModule,
    NbCardModule,
  ],
  declarations: [
    FeedbackComponent ,
  ],
})
export class FeedbackModule { }
