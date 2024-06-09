import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { FeedbackCreateComponent } from './feedback-create/feedback-create.component';
import { FeedbackEditComponent } from './feedback-edit/feedback-edit.component';
const routes: Routes = [
  {
    path: '',
    component: FeedbackListComponent,
  },
  {
    path: 'create',
    component: FeedbackCreateComponent,
  },
  {
    path: 'edit/:id',
    component: FeedbackEditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
