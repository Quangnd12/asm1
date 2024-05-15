
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ordersData {

  constructor() { }

  getData(): any[] {

    return [
      { id_cs: 1, id_pr: 232, quantity: '23', order_date: '12/12/2024', order_status: 'chưa mua' },

    ];
  }
}

