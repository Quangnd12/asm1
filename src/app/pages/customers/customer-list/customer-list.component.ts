import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CustomersService } from '../../../@core/services/apis/customers.service';
import { ToastrService } from 'ngx-toastr';
import { ICustomers } from 'app/@core/model/customers.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  customers: ICustomers[] = []; // Sử dụng kiểu ICustomers
  deleteModalRef: NgbModalRef | undefined;
  customerToDelete: ICustomers | null = null;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private customerService: CustomersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe(
      response => {
        console.log('Loaded customers:', response); // Kiểm tra dữ liệu nhận được
        if (response && Array.isArray(response.data)) {
          this.customers = response.data;
          this.customers.forEach(customer => {
            if (!customer._id) {
              console.error('Customer does not have an ID:', customer);
            }
          });
        } else {
          console.error('Expected an array but got:', response);
          // Xử lý lỗi nếu cần
        }
      },
      error => {
        console.error('Error loading customers:', error);
      }
    );
  }

  editCustomer(customer: ICustomers): void {
    this.router.navigate(['/pages/customers/edit', customer._id]);
    console.log('Edit customer', customer);
  }

  openDeleteModal(content: any, customer: ICustomers): void {
    console.log('Opening delete modal for customer:', customer);
    this.customerToDelete = customer;
    this.deleteModalRef = this.modalService.open(content);
  }

  confirmDelete(): void {
    if (this.customerToDelete && this.customerToDelete._id) {
      const customerId = this.customerToDelete._id;
      this.deleteModalRef?.close();
      this.deleteCustomer(customerId); // Truyền ID vào deleteCustomer
    } else {
      console.error('Customer ID is undefined or invalid:', this.customerToDelete);
    }
  }

  deleteCustomer(customerId: string): void {
    if (!customerId) {
      console.error('Customer ID is undefined:', customerId);
      return;
    }

    console.log('Deleting customer with ID:', customerId); // Kiểm tra ID trước khi xóa
    this.customerService.deleteCustomer(customerId).subscribe(
      response => {
        this.toastr.success('Xóa khách hàng thành công', 'Success', {
          progressBar: true,
          timeOut: 3000,
          closeButton: true,
          tapToDismiss: true,
          toastClass: 'ngx-toastr toast-success',
        });
        this.loadCustomers(); // Cập nhật danh sách khách hàng sau khi xóa
      },
      error => {
        this.toastr.error('Xóa khách hàng thất bại', 'Error', {
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
    this.router.navigate(['/pages/customers/create']);
  }
}
