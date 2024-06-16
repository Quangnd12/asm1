import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from '../../../@core/services/apis/orders.service';
import { IOrders } from 'app/@core/model/orders.model';
import { CustomersService } from '../../../@core/services/apis/customers.service';
import { ProductsService } from '../../../@core/services/apis/products.service';

@Component({
  selector: 'app-orders-create',
  templateUrl: './orders-create.component.html',
  styleUrls: ['./orders-create.component.scss']
})
export class OrdersCreateComponent implements OnInit {
  ordersForm: FormGroup;
  customers: any[] = [];
  products: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private ordersService: OrdersService,
    private customersService: CustomersService,
    private productsService: ProductsService
  ) {
    this.ordersForm = this.fb.group({
      customers: ['', Validators.required],
      products: ['', Validators.required],
      quantity: ['', Validators.required,],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCustomers();
    this.loadProducts();
  }

  loadCustomers(): void {
    this.customersService.getCustomers().subscribe(
      (response: any) => {
        this.customers = response.data;
      },
      (error) => {
        console.error('Error loading customers', error);
      }
    );
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe(
      (response: any) => {
        this.products = response.data;
      },
      (error) => {
        console.error('Error loading products', error);
      }
    );
  }

  onSubmit(): void {
    if (this.ordersForm.valid) {
      const formData: IOrders = {
        customers: this.ordersForm.value.customers,
        products: this.ordersForm.value.products,
        quantity: this.ordersForm.value.quantity,
        status: this.ordersForm.value.status
      };
      this.ordersService.createOrder(formData).subscribe(
        () => {
          console.log('Order created successfully');
          this.router.navigate(['/pages/orders']);
          this.toastr.success('Tạo đơn hàng thành công', 'Success', {
            progressBar: true,
            timeOut: 3000,
            closeButton: true,
            tapToDismiss: true,
            toastClass: 'ngx-toastr toast-success'
          });
        },
        (error) => {
          console.error('Error creating order', error);
          this.toastr.error('Tạo đơn hàng thất bại', 'Error', {
            progressBar: true,
            timeOut: 3000,
            closeButton: true,
            tapToDismiss: true,
            toastClass: 'ngx-toastr toast-error'
          });
        }
      );
    } else {
      this.ordersForm.markAllAsTouched();
    }
  }
}
