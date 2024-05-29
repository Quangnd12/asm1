import { Component , OnInit} from '@angular/core';
import { FeedBackData } from 'app/@core/data/feedback';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  customers = {
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
        title: 'Tên khách hàng',
        type: 'string',
      },
      content: {
        title: 'Nội dung',
        type: 'string',
      },
      star: {
        title: 'Mức độ hài lòng',
        type: 'string',
      },
      date: {
        title: 'Ngày phản hồi',
        type: 'string',
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: FeedBackData) {
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
