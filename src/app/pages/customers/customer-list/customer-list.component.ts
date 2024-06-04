import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ICustomer } from '../../../@core/data/customer';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent {
  customers: any[] = [];
  deleteModalRef: NgbModalRef | undefined;
  customerToDelete: any = null;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private customerService: ICustomer,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customers = this.customerService.getData();
  }

  editCustomer(customer: any): void {
    this.router.navigate(['/pages/customers/edit', customer.id]);
    console.log('Edit customer', customer);
  }

  openDeleteModal(content: any, customer: any): void {
    this.customerToDelete = customer;
    this.deleteModalRef = this.modalService.open(content);
  }

  confirmDelete(): void {
    if (this.customerToDelete) {
      this.deleteModalRef?.close();
      this.deleteCustomer(this.customerToDelete);
    }
  }

  deleteCustomer(customer: any): void {
    // Xử lý xóa khách hàng
    this.toastr.success('Xóa khách hàng thành công', 'Success', {
      progressBar: true,
      timeOut: 3000,
      closeButton: true,
      tapToDismiss: true,
      toastClass: 'ngx-toastr toast-success',
    });
    // Cập nhật danh sách khách hàng sau khi xóa
    this.loadCustomers();
    // Đóng modal sau khi xóa thành công
    this.deleteModalRef?.close();
  }

  navigateToCreate(): void {
    this.router.navigate(['/pages/customers/create']);
  }
}
