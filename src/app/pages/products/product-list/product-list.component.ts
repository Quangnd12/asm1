import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../../@core/services/apis/products.service'; // Import ProductService
import { IProduct } from 'app/@core/model/products.model';
import { PdfService } from '../../../@core/services/common/pdf-table';
@Component({
  selector: 'app-products-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  productToDelete: IProduct | null = null;
  deleteModalRef: NgbModalRef | undefined;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private productService: ProductsService, // Inject ProductService
    private toastr: ToastrService,
    private pdfService: PdfService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      response => {
        console.log('Loaded products:', response);
        if (response && Array.isArray(response.data)) { // Kiểm tra nếu response là một mảng
          this.products = response.data;
          this.products.forEach(product => {
            if (!product._id) {
              console.error('Product does not have an ID:', product);
            }
          });
        } else {
          console.error('Response is not an array:', response);
        }
      },
      error => {
        console.error('Error loading products:', error);
      }
    );
  }
  
  generatePdf(): void {
    this.pdfService.generatePdf('table-to-print', 'products'); // Id của table và tên file PDF
  }
  
  editProduct(product: any): void {
    this.router.navigate(['/pages/products/edit', product._id]);
    console.log('Edit product', product);
  }

  openDeleteModal(content: any, product: IProduct): void {
    console.log('Opening delete modal for product:', product);
    this.productToDelete = product;
    this.deleteModalRef = this.modalService.open(content);
  }

  confirmDelete(): void {
    if (this.productToDelete && this.productToDelete._id) {
      const productId = this.productToDelete._id;
      this.deleteModalRef?.close();
      this.deleteProduct(productId);
    } else {
      console.error('Product ID is undefined or invalid:', this.productToDelete);
    }
  }
  
  deleteProduct(productId: any): void {
    if (!productId) {
      console.error('Product ID is undefined:', productId);
      return;
    }
  
    this.productService.deleteProduct(productId).subscribe(
      response => {
        this.toastr.success('Xóa sản phẩm thành công', 'Success', {
          progressBar: true,
          timeOut: 3000,
          closeButton: true,
          tapToDismiss: true,
          toastClass: 'ngx-toastr toast-success'
        });
        this.loadProducts(); // Reload products after successful deletion
      },
      error => {
        console.error('Error deleting product', error);
        this.toastr.error('Xóa sản phẩm thất bại', 'Error', {
          progressBar: true,
          timeOut: 3000,
          closeButton: true,
          tapToDismiss: true,
          toastClass: 'ngx-toastr toast-error'
        });
      }
    );
  }
  

  navigateToCreate(): void {
    this.router.navigate(['/pages/products/create']);
  }
}
