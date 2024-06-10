import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../../@core/services/apis/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
  productForm: FormGroup;
  fileToUpload: File | null = null;
  currentFilename: string | null = null; // Lưu trữ tên tệp hiện tại
  id: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private productsService: ProductsService
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      describes: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      filename: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0)]],
      brand: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getProduct(this.id);
  }

  getProduct(id: string): void {
    this.productsService.getProduct(id).subscribe(
      response => {
        if (response) {
          this.currentFilename = response.filename; // Lưu trữ tên tệp hiện tại
          this.productForm.patchValue({
            name: response.name,
            describes: response.describes,
            price: response.price,
            filename: response.filename,
            quantity: response.quantity,
            brand: response.brand ? response.brand.split(',') : [] // Ensure brand is split into array
          });
        }
      },
      error => {
        console.log('Error fetching product data:', error);
      }
    );
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

      // Kiểm tra nếu người dùng đã tải lên tệp mới
      if (this.fileToUpload) {
        formData.append('file', this.fileToUpload, this.fileToUpload.name);
      } else {
        // Nếu không, sử dụng tên tệp hiện tại
        formData.append('filename', this.currentFilename || '');
      }

      this.productsService.updateProduct(this.id, formData).subscribe(
        response => {
          console.log('Product updated successfully');
          this.toastmess();
          this.router.navigate(['/pages/products']);
        },
        error => {
          console.error('Error updating product', error);
          this.toastrService.error('Cập nhật thất bại', 'Error', {
            progressBar: true,
            timeOut: 3000,
            closeButton: true,
            tapToDismiss: true,
            toastClass: 'ngx-toastr toast-error'
          });
        }
      );
    } else {
      // Nếu form không hợp lệ, hiển thị thông báo lỗi cho từng trường
      Object.keys(this.productForm.controls).forEach(key => {
        this.productForm.get(key)?.markAsTouched();
      });
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.fileToUpload = file;
      this.productForm.patchValue({ filename: file.name });
    }
  }

  displayFilename(): string {
    return this.productForm.get('filename')?.value || 'Chưa có tệp nào được chọn';
  }

  toastmess() {
    this.toastrService.success('Cập nhật thành công', 'Success', {
      progressBar: true,
      timeOut: 3000,
      closeButton: true,
      tapToDismiss: true,
      toastClass: 'ngx-toastr toast-success'
    });
  }
}
