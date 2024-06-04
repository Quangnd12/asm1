import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IProduct } from '../../../@core/data/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  productToDelete: any = null;
  deleteModalRef: NgbModalRef | undefined;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private productService: IProduct,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products = this.productService.getData();
  }

  editProduct(product: any): void {
    this.router.navigate(['/pages/products/edit', product.id]);
    console.log('Edit product', product);
  }

  openDeleteModal(content: any, product: any): void {
    this.productToDelete = product;
    this.deleteModalRef = this.modalService.open(content);
  }

  confirmDelete(): void {
    if (this.productToDelete) {
      this.deleteModalRef?.close();
      this.deleteProduct(this.productToDelete);
    }
  }
  
  deleteProduct(product: any): void {
    this.loadProducts();
    this.toastr.success('Xóa sản phẩm thành công', 'Success', {
      progressBar: true,
      timeOut: 3000,
      closeButton: true,
      tapToDismiss: true,
      toastClass: 'ngx-toastr toast-success'
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['/pages/products/create']);
  }
}
