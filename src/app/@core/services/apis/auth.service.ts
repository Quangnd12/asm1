import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface ILogin {
  useremail: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiBaseUrl;
  private jwtHelperService = new JwtHelperService();

  constructor(private _http: HttpClient) { }

  login(data: ILogin): Observable<any> {
    return this._http.post(`${this.apiUrl}/auth/login`, data);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      const expired = this.jwtHelperService.isTokenExpired(token);
      if (expired) {
        this.logout();
      }
      return !expired;
    }
    return false;
  }

  logout(): Observable<any> {
    const token = this.getToken();
    localStorage.clear();
    return this._http.post(`${this.apiUrl}/auth/login`, { token });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
