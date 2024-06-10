import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeesService } from '../../../@core/services/apis/employees.service';
import { IEmployees } from 'app/@core/model/employees.model';

@Component({
  selector: 'app-employees-create',
  templateUrl: './employees-create.component.html',
  styleUrls: ['./employees-create.component.scss']
})
export class EmployeesCreateComponent implements OnInit {
  employeesForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private employeesService: EmployeesService
  ) {
    this.employeesForm = this.fb.group({
      username: ['', Validators.required],
      position: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
      gender: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  get username() {
    return this.employeesForm.get('username');
  }

  get position() {
    return this.employeesForm.get('position');
  }

  get email() {
    return this.employeesForm.get('email');
  }

  get phone() {
    return this.employeesForm.get('phone');
  }

  get gender() {
    return this.employeesForm.get('gender');
  }

  onSubmit(): void {
    if (this.employeesForm.valid) {
      const formData: IEmployees = this.employeesForm.value;
      this.employeesService.createEmployee(formData).subscribe(
        () => {
          console.log('Employee created successfully');
          this.router.navigate(['/pages/employees']);
          this.toastr.success('Thêm nhân viên thành công', 'Success', {
            progressBar: true,
            timeOut: 3000,
            closeButton: true,
            tapToDismiss: true,
            toastClass: 'ngx-toastr toast-success'
          });
        },
        (error) => {
          console.error('Error creating employee', error);
          this.toastr.error('Thêm nhân viên thất bại', 'Error', {
            progressBar: true,
            timeOut: 3000,
            closeButton: true,
            tapToDismiss: true,
            toastClass: 'ngx-toastr toast-error'
          });
        }
      );
    }
  }
}
