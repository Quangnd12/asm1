import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent {
  productForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  OnInit(){
    
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      describe: [''],
      price: [null, Validators.required],
      image: [''],
      quantity: [null],
      brand: ['']
    });
  }
  onSubmit(): void {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
    }
  }

  onFileChange(event: any): void {
    console.log(event.target.files[0]);
  }
}
