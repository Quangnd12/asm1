import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedbackService } from 'app/@core/services/apis/feedback.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-feedback-create',
  templateUrl: './feedback-create.component.html',
  styleUrls: ['./feedback-create.component.scss']
})
export class FeedbackCreateComponent implements OnInit {
  FeedbackForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService ,
    private FeedbackService : FeedbackService
  ) {
    this.FeedbackForm = this.fb.group({
      username: new FormControl ('', [Validators.required]),
      content: new FormControl ('', [Validators.required]),
      star: new FormControl ('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.FeedbackForm.valid) {
      const formData = this.FeedbackForm.value;
      console.log('Customer created successfully', formData);
      // this.router.navigate(['/pages/staff']);
      this.FeedbackService.create(formData).subscribe(
        (hero) => {
          if (hero) {
            this.toastmess()

          }
        },
        (err) => {
          this.toastr.error('xóa thất bại', 'Error', {
            progressBar: true,
            timeOut: 3000,
            closeButton: true,
            tapToDismiss: true,
            toastClass: 'ngx-toastr toast-error',
          });
        }
      );

    }
  }
  toastmess(){
    this.toastr.success('Thêm thành công', 'Success', {
      progressBar: true,
      timeOut: 3000,
      closeButton: true,
      tapToDismiss: true,
      toastClass: 'ngx-toastr toast-success'
    });
  }
}
