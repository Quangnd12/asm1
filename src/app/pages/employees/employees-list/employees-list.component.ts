import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmployeesData } from '../../../@core/data/employees'

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent {
  employees: any[] = []
  deleteModalRef: NgbModalRef | undefined;
  employeesToDelete: any = null;

  constructor(private router: Router, private modalService: NgbModal, private employeesService: EmployeesData) { }

  ngOnInit(): void {
    this.loademployees();
  }

  loademployees(): void {
    this.employees = this.employeesService.getData();
  }

  editEmployees(employees: any): void {
    this.router.navigate(['/pages/employees/edit', employees.id_employees]);
    console.log('Edit employees', employees);
  }

  openDeleteModal(content: any, employees: any): void {
    this.employeesToDelete = employees;
    this.deleteModalRef = this.modalService.open(content);
  }

  confirmDelete(): void {
    if (this.employeesToDelete) {
      this.deleteModalRef?.close();
    }
  }

  navigateToCreate(): void {
    this.router.navigate(['/pages/employees/create']);
  }
}
