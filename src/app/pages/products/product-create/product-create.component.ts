import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../../@core/services/apis/products.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  productForm: FormGroup;
  fileToUpload: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private productService: ProductsService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      describes: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      quantity: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]],
      brand: ['', Validators.required],
      filename: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileToUpload = file;
      this.productForm.patchValue({ filename: file.name });
    }
  }
  
  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      Object.keys(this.productForm.controls).forEach(key => {
        const controlValue = this.productForm.get(key)?.value;
        if (controlValue !== null) {
          formData.append(key, controlValue);
        }
      });

      if (this.fileToUpload) {
        formData.append('file', this.fileToUpload, this.fileToUpload.name);
      }

      this.productService.createProduct(formData).subscribe(
        response => {
          console.log('Product created successfully', response);
          this.router.navigate(['/pages/products']);
          this.toastr.success('Thêm thành công', 'Success', {
            progressBar: true,
            timeOut: 3000,
            closeButton: true,
            tapToDismiss: true,
            toastClass: 'ngx-toastr toast-success'
          });
        },
        error => {
          console.error('Error creating product', error);
          this.toastr.error('Thêm thất bại', 'Error', {
            progressBar: true,
            timeOut: 3000,
            closeButton: true,
            tapToDismiss: true,
            toastClass: 'ngx-toastr toast-error'
          });
        }
      );
    }
  }
}
