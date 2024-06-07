import { ExportService } from './../../../@core/services/common/exportEx.service';
import { StaffService } from './../../../@core/services/apis/staff.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { IProduct } from '../../../@core/data/product';
import { ToastrService } from 'ngx-toastr';
import { StaffInfo } from 'app/@core/model/staff.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent {
  listStaff: StaffInfo[] = [];
  productToDelete: any = null;
  deleteModalRef: NgbModalRef | undefined;
  isLoading: boolean | undefined;
  nametable : string = 'staffs' 
  formattedDate: string;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private StaffService: StaffService,
    private toastr: ToastrService ,
    private exportService : ExportService
  ) {
   
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadProducts();

  }

  loadProducts(): void{ {
    this.StaffService.getAll().subscribe(
      (res: any) => {
        this.isLoading = false;
        this.listStaff = res.data.reverse();
      },
      (err) => {
        this.isLoading = false;
        console.log('Error:', err);
      }
    );;
  }
  }
  editProduct(id: string): void {
    this.router.navigate(['/pages/staff/edit', id]);
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
    this.StaffService.remove(idproduct).subscribe(
      (res: any) => {
        console.log(res);
        this.loadProducts();
        this.toastr.success('Xóa sản phẩm thành công', 'Success', {
          progressBar: true,
          timeOut: 3000,
          closeButton: true,
          tapToDismiss: true,
          toastClass: 'ngx-toastr toast-success'
        });
      },
      (err) => {
        console.log('Error:', err);
      }
    );;
   
  }

  navigateToCreate(): void {
    this.router.navigate(['/pages/staff/create']);
  }
  exportToExcel(): void {
    const columnsToInclude = ['Tên nhân viên', 'Nội dung đào tạo', 'Người đào tạo' , 'ghi chú' , 'ngày dào tạo'];
    this.exportService.exportFilteredTableToExcel('staffTable', this.nametable, ' Bảng ' + this.nametable, columnsToInclude);
  }
 
}
