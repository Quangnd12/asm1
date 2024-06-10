import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IEmployees } from '../../model/employees.model';

interface ServerResponse {
  data: IEmployees[];
  statuscode: number;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  [x: string]: any;
  private apiUrl = 'http://localhost:8080/employees';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.apiUrl);
  }


  createEmployee(employee: IEmployees): Observable<any> {
    return this.http.post<any>(this.apiUrl, employee).pipe(
      catchError(error => {
        // Xử lý lỗi ở đây nếu cần
        throw error;
      })
    );
  }

  updateEmployee(id: string, employee: IEmployees): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, employee).pipe(
      catchError(error => {
        // Xử lý lỗi ở đây nếu cần
        throw error;
      })
    );
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        // Xử lý lỗi ở đây nếu cần
        throw error;
      })
    );
  }
}
