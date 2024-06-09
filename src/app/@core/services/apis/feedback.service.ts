import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import {ApiService} from "../common";
import {API_ENDPOINT} from "../../config/api-endpoint.config";
import { FeedbackInfo } from 'app/@core/model/feedback.model';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService extends ApiService {

  constructor(
    private _http: HttpClient, private authService : AuthService
  ) {
    super(_http);
  }
  httpOptions  = {
    headers: new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.getToken() })
  };
  getAll(): Observable<any>  {
    
    return this._http.get(API_ENDPOINT.auth.feedback  , this.httpOptions);
  }
  create(data : FeedbackInfo): Observable<any>   {
   
    return  this._http.post(API_ENDPOINT.auth.feedback , data , this.httpOptions);
  }
  remove(id: string): Observable<any> {
    return  this._http.delete(API_ENDPOINT.auth.feedback + '/' + id , this.httpOptions);
  }
  getbyId(id:string): Observable<any>{
    return  this._http.get(API_ENDPOINT.auth.feedback + '/' + id,this.httpOptions );

  }
  update(id : string , data : FeedbackInfo ): Observable<any>{
    return  this._http.put(API_ENDPOINT.auth.feedback + '/' + id , data ,this.httpOptions);

  }
}
