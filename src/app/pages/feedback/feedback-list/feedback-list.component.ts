// import { StaffService } from './../../../@core/services/apis/staff.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'jspdf-autotable';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FeedbackInfo } from 'app/@core/model/feedback.model';
import { FeedbackService } from 'app/@core/services/apis/feedback.service';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss'],
})
export class FeedbackListComponent implements OnInit {
  listFeedback: FeedbackInfo[] = [];
  productToDelete: any = null;
  deleteModalRef: NgbModalRef | undefined;
  isLoading: boolean | undefined;
  formattedDate: string;
  messError: string;
  // pagination 
  apiUrl: string = 'http://localhost:8080/feedbacks';
  Current_page: number = 0;
  last_page: number = 0;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private FeedbackService: FeedbackService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.loadProducts();
  }

  loadProducts(): void {
    {
      this.isLoading = true;
      this.FeedbackService.getAll().subscribe(
        (res: any) => {
          this.isLoading = false;
          this.listFeedback = res.data.slice(0,4);
          this.last_page = Math.ceil( res.data.length / 4);
        },
        (err) => {
          this.isLoading = false;
          this.messError = err.message;
          console.log('Error:', err);
        }
      );
    }
  }
  getpage(res: any) {
    console.log('cehck data', res.data);

    this.listFeedback = res.data;
  }
  editProduct(id: string): void {
    this.router.navigate(['/pages/feedback/edit', id]);
  }

  openDeleteModal(content: any, id: string): void {
    this.productToDelete = id;
    this.deleteModalRef = this.modalService.open(content);
  }

  confirmDelete(): void {
    if (this.productToDelete) {
      this.deleteModalRef?.close();
      this.deleteProduct(this.productToDelete);
    }
  }

  deleteProduct(idproduct: string): void {
    this.FeedbackService.remove(idproduct).subscribe(
      (res: any) => {
        console.log(res);
        this.loadProducts();
        this.toastr.success('Xóa sản phẩm thành công', 'Success', {
          progressBar: true,
          timeOut: 3000,
          closeButton: true,
          tapToDismiss: true,
          toastClass: 'ngx-toastr toast-success',
        });
      },
      (err) => {
        console.log('Error:', err);
      }
    );
  }

  navigateToCreate(): void {
    this.router.navigate(['/pages/feedback/create']);
  }
}
