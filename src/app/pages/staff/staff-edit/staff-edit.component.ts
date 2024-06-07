import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffInfo } from 'app/@core/model/staff.model';
import { StaffService } from 'app/@core/services/apis/staff.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-staff-edit',
  templateUrl: './staff-edit.component.html',
  styleUrls: ['./staff-edit.component.scss']
})
export class StaffEditComponent {
  StaffForm: FormGroup;
  infodata: StaffInfo
  id : string ;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService ,
    private staffService : StaffService ,
    private route: ActivatedRoute,

  ) {
    this.StaffForm = this.fb.group({
      username: new FormControl ('', [Validators.required]),
      content: new FormControl ('', [Validators.required]),
      trainers: new FormControl ('', [Validators.required]),
      note: new FormControl (' '),
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getDataByid(this.id)
  }
  getDataByid(id: string){
    console.log('check id ', id);
    this.staffService.getbyId(id).subscribe((res: any) => {
      this.infodata = res.data
      console.log('check' , res);
      
    });
  }


  onSubmit(): void {
    if (this.StaffForm.valid) {
      const formData = this.StaffForm.value;
      console.log('Customer created successfully', formData);
      this.staffService.update(this.id ,formData).subscribe(
        (hero) => {
          if (hero) {
            this.toastmess()
            this.router.navigate(['/pages/staff']);
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
