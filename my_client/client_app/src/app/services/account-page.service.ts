import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { ICustomer } from '../interfaces/customers';
import { IOrder } from '../interfaces/orders';

@Injectable({
  providedIn: 'root'
})
export class AccountPageService {

  constructor(private _http: HttpClient) { }

  getCustomers():Observable<any>{
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("/customers",requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<ICustomer>),
      retry(3),
      catchError(this.handleError)
    )
  }

  getCustomerInfo(email:any):Observable<any> {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("/customers/"+email,requestOptions).pipe(
      map(res=>JSON.parse(res) as ICustomer),
      retry(3),
      catchError(this.handleError)
    )
  }

  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }

  getPurchaseHistory(email:any):Observable<any> {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("/orders/"+email,requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<IOrder>),
      retry(3),
      catchError(this.handleError)
    )
  }

  updateCusInfo(aCus:any, email:any):Observable<any>{
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.put<any>("/customers/"+email,JSON.stringify(aCus),requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<ICustomer>),
      retry(3),
      catchError(this.handleError)
    )
  }

  checkEmailExists(email: any): Observable<boolean> {
    return this._http.get<any>(`/customers/check-email/${email}`).pipe(
      map(res => res as boolean),
      catchError(this.handleError)
    );
  }
}
