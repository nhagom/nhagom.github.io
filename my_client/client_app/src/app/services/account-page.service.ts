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

  getCustomerInfo(id:string):Observable<any> {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("/customers/"+id,requestOptions).pipe(
      map(res=>JSON.parse(res) as ICustomer),
      retry(3),
      catchError(this.handleError)
    )
  }

  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }

  getPurchaseHistory(ID:string):Observable<any> {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("/orders/"+ID,requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<IOrder>),
      retry(3),
      catchError(this.handleError)
    )
  }

  updateCusInfo(aCus:any, ID:string):Observable<any>{
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.put<any>("/customers/"+ID,JSON.stringify(aCus),requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<ICustomer>),
      retry(3),
      catchError(this.handleError)
    )
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this._http.get<any>(`/customers/check-email/${email}`).pipe(
      map(res => res as boolean),
      catchError(this.handleError)
    );
  }
}
