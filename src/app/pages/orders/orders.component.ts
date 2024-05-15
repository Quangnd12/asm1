import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { ordersData } from 'app/@core/data/order_table';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./orders.component.scss'],
  templateUrl: './orders.component.html',
})
export class ordersComponent implements OnInit {
  ngOnInit(): void { }

  orders = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id_cs: {
        title: 'ID_Customer',
        type: 'number',
      },
      id_pr: {
        title: 'ID_Product',
        type: 'number',
      },
      quantity: {
        title: 'Số lượng',
        type: 'number',
      },
      order_date: {
        title: 'Ngày đặt hàng',
        type: 'string',
      },
      order_status: {
        title: 'Tình trạng đặt hàng',
        type: 'string',
      }

    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: ordersData) {
    const data = this.service.getData();
    this.source.load(data);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Bạn chắc chắn muốn xóa?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
