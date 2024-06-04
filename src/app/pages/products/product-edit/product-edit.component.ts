import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent {
  productForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      describe: [''],
      price: [null, Validators.required],
      image: [''],
      quantity: [null],
      brand: [''],
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      this.toastrService.success('Cập nhật thành công', 'Success', {
        progressBar: true,
        timeOut: 3000,
        closeButton: true,
        tapToDismiss: true,
        toastClass: 'ngx-toastr toast-success',
      });
      this.router.navigate(['/pages/products']);
    }
  }

  onFileChange(event: any): void {
    console.log(event.target.files[0]);
  }
}
