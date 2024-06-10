import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ordersData } from 'app/@core/data/order_table';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent {
  orders: any[] = []
  deleteModalRef: NgbModalRef | undefined;
  ordersToDelete: any = null;

  constructor(private router: Router, private modalService: NgbModal, private OrdersService: ordersData) { }

  ngOnInit(): void {
    this.loadorders();
  }

  loadorders(): void {
    this.orders = this.OrdersService.getData();
  }

  editOrders(orders: any): void {
    this.router.navigate(['/pages/orders/edit', orders.id_cs]);
    console.log('Edit Orders', orders);
  }

  openDeleteModal(content: any, orders: any): void {
    this.ordersToDelete = orders;
    this.deleteModalRef = this.modalService.open(content);
  }

  confirmDelete(): void {
    if (this.ordersToDelete) {
      this.deleteModalRef?.close();
    }
  }

  navigateToCreate(): void {
    this.router.navigate(['/pages/orders/create']);
  }
}
