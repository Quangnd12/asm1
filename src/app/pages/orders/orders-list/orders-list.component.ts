import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OrdersService } from 'app/@core/services/apis/orders.service';
import { IOrders } from 'app/@core/model/orders.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  orders: IOrders[] = [];
  deleteModalRef: NgbModalRef | undefined;
  ordersToDelete: IOrders | null = null;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private ordersService: OrdersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.ordersService.getOrders().subscribe(
      response => {
        this.orders = response.data;
      },
      error => {
        console.error('Error loading orders:', error);
      }
    );
  }

  editOrders(orders: IOrders): void {
    this.router.navigate(['/pages/orders/edit', orders._id]);
    console.log('Edit Orders', orders);
  }

  openDeleteModal(content: any, orders: IOrders): void {
    this.ordersToDelete = orders;
    this.deleteModalRef = this.modalService.open(content);
  }

  confirmDelete(): void {
    if (this.ordersToDelete) {
      // Gọi phương thức xóa từ service
      this.ordersService.deleteOrder(this.ordersToDelete._id).subscribe(
        response => {
          // Xử lý thành công nếu cần
          console.log('Delete success:', response);
          // Sau khi xóa thành công, cập nhật lại danh sách đơn hàng
          this.toastr.success('Xóa khách hàng thành công', 'Success', {
            progressBar: true,
            timeOut: 3000,
            closeButton: true,
            tapToDismiss: true,
            toastClass: 'ngx-toastr toast-success',
          });
          this.loadOrders();
        },
        error => {
          console.error('Error deleting order:', error);
          // Xử lý lỗi nếu cần
        }
      );
      this.deleteModalRef?.close();
    }
  }

  navigateToCreate(): void {
    this.router.navigate(['/pages/orders/create']);
  }
}
