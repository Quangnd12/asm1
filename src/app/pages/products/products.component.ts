import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from 'app/@core/data/smart-table';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  ngOnInit(): void {}

  products = {
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
      name: {
        title: 'Tên sản phẩm',
        type: 'string',
      },
      describe: {
        title: 'Mô tả',
        type: 'string',
      },
      price: {
        title: 'Giá',
        type: 'number',
      },
      img: {
        title: 'Ảnh sản phẩm',
        type: 'string',
      },
      quantity: {
        title: 'Số lượng',
        type: 'number',
      },
      brand: {
        title: 'Nhãn hiệu',
        type: 'string',
      }
    },
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData) {
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
