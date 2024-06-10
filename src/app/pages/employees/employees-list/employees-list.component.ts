import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmployeesService } from '../../../@core/services/apis/employees.service';
import { ToastrService } from 'ngx-toastr';
import { IEmployees } from 'app/@core/model/employees.model';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
})
export class EmployeesListComponent implements OnInit {
  employees: IEmployees[] = [];
  deleteModalRef: NgbModalRef | undefined;
  employeeToDelete: IEmployees | null = null;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private employeeService: EmployeesService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      response => {
        console.log('Loaded employees:', response);
        if (response && Array.isArray(response.data)) {
          this.employees = response.data;
          this.employees.forEach(employee => {
            if (!employee._id) {
              console.error('Employee does not have an ID:', employee);
            }
          });
        } else {
          console.error('Expected an array in response.data but got:', response);
        }
      },
      error => {
        console.error('Error loading employees:', error);
      }
    );
  }



  editEmployee(employee: IEmployees): void {
    this.router.navigate(['/pages/employees/edit', employee._id]);
    console.log('Edit employee', employee);
  }

  openDeleteModal(content: any, employee: IEmployees): void {
    console.log('Opening delete modal for employee:', employee);
    this.employeeToDelete = employee;
    this.deleteModalRef = this.modalService.open(content);
  }

  confirmDelete(): void {
    if (this.employeeToDelete && this.employeeToDelete._id) {
      const employeeId = this.employeeToDelete._id;
      this.deleteModalRef?.close();
      this.deleteEmployee(employeeId);
    } else {
      console.error('Employee ID is undefined or invalid:', this.employeeToDelete);
    }
  }

  deleteEmployee(employeeId: string): void {
    if (!employeeId) {
      console.error('Employee ID is undefined:', employeeId);
      return;
    }

    console.log('Deleting employee with ID:', employeeId);
    this.employeeService.deleteEmployee(employeeId).subscribe(
      response => {
        this.toastr.success('Xóa nhân viên thành công', 'Success', {
          progressBar: true,
          timeOut: 3000,
          closeButton: true,
          tapToDismiss: true,
          toastClass: 'ngx-toastr toast-success',
        });
        this.loadEmployees();
      },
      error => {
        this.toastr.error('Xóa nhân viên thất bại', 'Error', {
          progressBar: true,
          timeOut: 3000,
          closeButton: true,
          tapToDismiss: true,
          toastClass: 'ngx-toastr toast-error',
        });
      }
    );
  }

  navigateToCreate(): void {
    this.router.navigate(['/pages/employees/create']);
  }
}
