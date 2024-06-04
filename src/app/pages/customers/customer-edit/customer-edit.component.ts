import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent {
  customerForm: FormGroup;
  constructor(private formBuilder: FormBuilder){}

  OnInit(){};

  ngOnit(){
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email:['', Validators.required],
      phone:['null', Validators.required],
    })
  }
  onSubmit(): void {
    if (this.customerForm.valid) {
      console.log(this.customerForm.value);
    }
  }
}
