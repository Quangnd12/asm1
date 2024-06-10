import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IOrders } from '../../model/orders.model';
import { ICustomers } from '../../model/customers.model';
interface ServerResponse {
  data: IOrders[];
  statuscode: number;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private apiUrl = 'http://localhost:8080/orders';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createOrder(order: IOrders): Observable<any> {
    return this.http.post<any>(this.apiUrl, order);
  }

  updateOrder(id: string, order: IOrders): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, order);
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  getOrder(id: string): Observable<IOrders> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }
  getCustomer(id: string): Observable<ICustomers> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }
}
