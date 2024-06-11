import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeesService } from '../../../@core/services/apis/employees.service';
import { IEmployees } from 'app/@core/model/employees.model';

@Component({
  selector: 'app-employees-edit',
  templateUrl: './employees-edit.component.html',
  styleUrls: ['./employees-edit.component.scss']
})
export class EmployeesEditComponent implements OnInit {
  employeesForm: FormGroup;
  employeeId: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private employeesService: EmployeesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['id'];

    this.employeesForm = this.fb.group({
      username: ['', Validators.required],
      position: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
      gender: ['', Validators.required],
    });

    this.loadEmployeeData();
  }

  loadEmployeeData(): void {
    this.employeesService.getEmployee(this.employeeId).subscribe(
      (employee: IEmployees) => {
        this.employeesForm.patchValue({
          username: employee.username,
          position: employee.position,
          email: employee.email,
          phone: employee.phone,
          gender: employee.gender
        });
      },
      (error) => {
        console.error('Error loading employee data', error);
        this.toastr.error('Không thể tải thông tin nhân viên', 'Error', {
          progressBar: true,
          timeOut: 3000,
          closeButton: true,
          tapToDismiss: true,
          toastClass: 'ngx-toastr toast-error'
        });
      }
    );
  }

  onSubmit(): void {
    if (this.employeesForm.valid) {
      const formData: IEmployees = this.employeesForm.value;
      this.employeesService.updateEmployee(this.employeeId, formData).subscribe(
        () => {
          console.log('Employee updated successfully');
          this.router.navigate(['/pages/employees']);
          this.toastr.success('Cập nhật nhân viên thành công', 'Success', {
            progressBar: true,
            timeOut: 3000,
            closeButton: true,
            tapToDismiss: true,
            toastClass: 'ngx-toastr toast-success'
          });
        },
        (error) => {
          console.error('Error updating employee', error);
          this.toastr.error('Cập nhật nhân viên thất bại', 'Error', {
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
