import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from '../../../@core/services/apis/customers.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss'],
})
export class CustomerEditComponent implements OnInit {
  customerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private customersService: CustomersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]],
    });

    // Lấy ID của khách hàng từ URL
    this.route.params.subscribe(params => {
      const customerId = params['id']; 
      this.getCustomer(customerId);
    });
  }

  // Hàm lấy thông tin khách hàng từ API
  getCustomer(id: string) {
    this.customersService.getCustomer(id).subscribe(
      response => {
        // console.log('Customer data:', response); // Log dữ liệu nhận được từ API
        if (response) {
          this.customerForm.patchValue(response); 
        }
      },
      error => {
        console.error('Error fetching customer data:', error);
      }
    );
  }

  // Hàm cập nhật thông tin khách hàng
  onSubmit(): void {
    if (this.customerForm.valid) {
      const formData = this.customerForm.value;
      const customerId = this.route.snapshot.params['id'];
      // Truyền cả ID và formData vào hàm updateCustomer
      this.customersService.updateCustomer(customerId, formData).subscribe(
        response => {
          console.log('Customer updated successfully', response);
          this.toastrService.success('Cập nhật thành công', 'Success', {
            progressBar: true,
            timeOut: 3000,
            closeButton: true,
            tapToDismiss: true,
            toastClass: 'ngx-toastr toast-success',
          });
          this.router.navigate(['/pages/customers']);
        },
        error => {
          console.error('Error updating customer', error);
          this.toastrService.error('Cập nhật thất bại', 'Error', {
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
}
