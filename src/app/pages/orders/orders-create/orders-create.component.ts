import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
@Component({
  selector: 'app-orders',
  templateUrl: './orders-create.component.html',
  styleUrls: ['./orders-create.component.scss']
})
export class OrdersCreateComponent implements OnInit {
  ordersForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.ordersForm = this.fb.group({
      id_cs: ['', Validators.required],
      id_pr: ['', Validators.required],
      quantity: ['', Validators.required],
      order_date: ['', Validators.required],
      order_status: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.ordersForm.valid) {
      const formData = this.ordersForm.value;
      console.log('orders created successfully', formData);
      this.router.navigate(['/pages/orders']);
    }
  }
}
