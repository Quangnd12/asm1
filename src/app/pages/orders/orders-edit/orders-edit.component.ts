import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-orders-edit',
  templateUrl: './orders-edit.component.html',
  styleUrls: ['./orders-edit.component.scss']
})
export class OrdersEditComponent implements OnInit {
  ordersForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.ordersForm = this.fb.group({
      id_cs: ['', [Validators.required]],
      id_pr: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      order_date: ['', [Validators.required]],
      order_status: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.ordersForm.valid) {
      console.log(this.ordersForm.value);
    }
  }
}
