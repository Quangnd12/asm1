import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { IProduct } from 'app/@core/data/product';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

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
      images: {
        title: 'Ảnh sản phẩm',
        type: 'html',
        valuePrepareFunction: (images: string) => {
          return `<img src="/assets/images/${images}" width="100px" height="100px"/>`;
        },
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

  constructor(private service: IProduct) {
    const data = this.service.getData();
    this.source.load(data);
  }

  ngOnInit(): void {}

  onDeleteConfirm(event): void {
    if (window.confirm('Bạn chắc chắn muốn xóa?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
