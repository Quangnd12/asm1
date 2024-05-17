import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { EmployeesData } from 'app/@core/data/employees';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./employees.component.scss'],
  templateUrl: './employees.component.html',
})
export class employeesComponent implements OnInit {
  ngOnInit(): void { }

  employees = {
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
      id_employees: {
        title: 'ID',
        type: 'number',
      },
      name: {
        title: 'Họ và Tên',
        type: 'string',
      },
      position: {
        title: 'Chức vụ',
        type: 'string',
      },
      phone: {
        title: 'Số điện thoại',
        type: 'number',
      },
      address: {
        title: 'Địa chỉ',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      sex: {
        title: 'Giới Tính',
        type: 'string',
      },
      date_create: {
        title: 'Ngày tạo',
        type: 'date',
      }

    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: EmployeesData) {
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
