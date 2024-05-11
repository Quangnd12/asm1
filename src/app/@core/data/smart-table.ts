
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SmartTableData {

  constructor() { }

  getData(): any[] {

    return [
      { id: 1, fullname: 'John', birthday: '1/1/2023', address: 'Cần thơ', email: 'john@example.com', phone: 123454678,img:'1.jpg' },

    ];
  }
}

