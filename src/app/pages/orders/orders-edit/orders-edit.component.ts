import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrdersService } from '../../../@core/services/apis/orders.service';
import { IOrders } from 'app/@core/model/orders.model';
import { CustomersService } from '../../../@core/services/apis/customers.service';
import { ProductsService } from '../../../@core/services/apis/products.service';

@Component({
  selector: 'app-orders-edit',
  templateUrl: './orders-edit.component.html',
  styleUrls: ['./orders-edit.component.scss']
})
export class OrdersEditComponent implements OnInit {
  ordersForm: FormGroup;
  customers: any[] = [];
  products: any[] = [];
  orderId: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private ordersService: OrdersService,
    private customersService: CustomersService,
    private productsService: ProductsService
  ) {
    this.ordersForm = this.fb.group({
      customers: ['', Validators.required],
      products: ['', Validators.required],
      quantity: ['', Validators.required],
      status: ['', Validators.required]
    });
    this.orderId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadCustomers();
    this.loadProducts();
    this.loadOrder();
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

  loadOrder(): void {
    this.ordersService.getOrderById(this.orderId).subscribe(
      (response: IOrders) => {
        this.ordersForm.patchValue({
          customers: response.customers,
          products: response.products,
          quantity: response.quantity,
          status: response.status
        });
      },
      (error) => {
        console.error('Error loading order', error);
      }
    );
  }

  onSubmit(): void {
    if (this.ordersForm.valid) {
      const formData: IOrders = {
        _id: this.orderId,
        customers: this.ordersForm.value.customers,
        products: this.ordersForm.value.products,
        quantity: this.ordersForm.value.quantity,
        status: this.ordersForm.value.status
      };
      this.ordersService.updateOrder(formData).subscribe(
        () => {
          console.log('Order updated successfully');
          this.router.navigate(['/pages/orders']);
          this.toastr.success('Cập nhật đơn hàng thành công', 'Success', {
            progressBar: true,
            timeOut: 3000,
            closeButton: true,
            tapToDismiss: true,
            toastClass: 'ngx-toastr toast-success'
          });
        },
        (error) => {
          console.error('Error updating order', error);
          this.toastr.error('Cập nhật đơn hàng thất bại', 'Error', {
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
