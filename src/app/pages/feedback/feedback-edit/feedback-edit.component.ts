import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackInfo } from 'app/@core/model/feedback.model';
import { FeedbackService } from 'app/@core/services/apis/feedback.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-feedback-edit',
  templateUrl: './feedback-edit.component.html',
  styleUrls: ['./feedback-edit.component.scss']
})
export class FeedbackEditComponent  implements OnInit{
  FeedbackForm: FormGroup;
  infodata: FeedbackInfo
  id : string ;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService ,
    private FeedbackService : FeedbackService ,
    private route: ActivatedRoute,

  ) {
    this.FeedbackForm = this.fb.group({
      username: new FormControl ('', [Validators.required]),
      content: new FormControl ('', [Validators.required]),
      star: new FormControl ('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getDataByid(this.id)
  }
  getDataByid(id: string){
    console.log('check id ', id);
    this.FeedbackService.getbyId(id).subscribe((res: any) => {
      this.infodata = res.data
      console.log('check' , res);
      
    });
  }


  onSubmit(): void {
    if (this.FeedbackForm.valid) {
      const formData = this.FeedbackForm.value;
      console.log('Customer created successfully', formData);
      this.FeedbackService.update(this.id ,formData).subscribe(
        (hero) => {
          if (hero) {
            this.toastmess()
            this.router.navigate(['/pages/feedback']);
          }
        },
        (err) => {
          console.log('Error:', err);
        }
      );

    }
  }
  toastmess(){
    this.toastr.success('Chỉnh sửa thành công', 'Success', {
      progressBar: true,
      timeOut: 3000,
      closeButton: true,
      tapToDismiss: true,
      toastClass: 'ngx-toastr toast-success'
    });
  }
}
