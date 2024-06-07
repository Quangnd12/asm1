import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import {ApiService} from "../common";
import {API_ENDPOINT} from "../../config/api-endpoint.config";
import { StaffInfo } from 'app/@core/model/staff.model';

@Injectable({
  providedIn: 'root',
})
export class StaffService extends ApiService {

  constructor(
    private _http: HttpClient,
  ) {
    super(_http);
  }

  getAll(): Observable<StaffInfo[]>  {
    return this.get(API_ENDPOINT.auth.staff);
  }
  create(data : StaffInfo): Observable<any>   {
    console.log('check data', data);
    console.log(API_ENDPOINT.auth.staff );
    return  this.post(API_ENDPOINT.auth.staff , data);
  }
  remove(id: string): Observable<any> {
    return  this.delete(API_ENDPOINT.auth.staff + '/' + id);
  }
  getbyId(id:string): Observable<any>{
    return  this.get(API_ENDPOINT.auth.staff + '/' + id);

  }
  update(id : string , data : StaffInfo ): Observable<any>{
    return  this.put(API_ENDPOINT.auth.staff + '/' + id , data);

  }
}
