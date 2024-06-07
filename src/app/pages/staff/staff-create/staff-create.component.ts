import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StaffInfo } from 'app/@core/model/staff.model';
import { StaffService } from 'app/@core/services/apis/staff.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-staff-create',
  templateUrl: './staff-create.component.html',
  styleUrls: ['./staff-create.component.scss']
})
export class StaffCreateComponent {
  StaffForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService ,
    private staffService : StaffService
  ) {
    this.StaffForm = this.fb.group({
      username: new FormControl ('', [Validators.required]),
      content: new FormControl ('', [Validators.required]),
      trainers: new FormControl ('', [Validators.required]),
      note: new FormControl (' '),
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.StaffForm.valid) {
      const formData = this.StaffForm.value;
      console.log('Customer created successfully', formData);
      // this.router.navigate(['/pages/staff']);
      this.staffService.create(formData).subscribe(
        (hero) => {
          if (hero) {
            this.toastmess()

          }
        },
        (err) => {
          console.log('Error:', err);
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
