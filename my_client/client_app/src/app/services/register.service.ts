import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { Customers } from '../models/customers';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private _http: HttpClient) { }
  postCustomers(aCustomer:any):Observable<any>{
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.post<any>("/customers",JSON.stringify(aCustomer),requestOptions).pipe(
      map(res=>JSON.parse(res) as Customers),
      retry(3),
      catchError(this.handleError)
    )
  }
  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }
}
