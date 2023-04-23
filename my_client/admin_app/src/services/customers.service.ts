import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { ICustomer } from 'src/interface/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

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
    handleError(error:HttpErrorResponse){
      return throwError(()=>new Error(error.message))
    }

    deleteCustomer(customerEmail:string):Observable<any>{
      const headers= new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
      const requestOptions: object={
        headers:headers,
        ResponseType:"text"
      }
      return this._http.delete<any>("/customers/delete/"+customerEmail,requestOptions).pipe(map(res=>JSON.parse(res) as Array<ICustomer>),
      retry(3),
      catchError(this.handleError))
    }

}
