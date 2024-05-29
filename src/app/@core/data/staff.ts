
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class StaffData {

  constructor() { }

  getData(): any[] {

    return [
        { id: 1, name: 'Nguyễn Văn A', content: 'quản lí', trainers: 'Kim thành lợi', note: 'tốt', date:'24/12/2003'},
    ];
  }

}

