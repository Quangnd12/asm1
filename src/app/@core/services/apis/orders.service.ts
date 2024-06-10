import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IOrders } from '../../model/orders.model';

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

  // Lấy danh sách đơn hàng
  getOrders(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.apiUrl).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  // Tạo một đơn hàng mới
  createOrder(order: IOrders): Observable<any> {
    return this.http.post<any>(this.apiUrl, order).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  // Cập nhật thông tin của một đơn hàng
  updateOrder(order: IOrders): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${order._id}`, order).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  // Xóa một đơn hàng
  deleteOrder(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  // Lấy thông tin chi tiết của một đơn hàng
  getOrderById(orderId: string): Observable<IOrders> {
    return this.http.get<IOrders>(`${this.apiUrl}/${orderId}`).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
