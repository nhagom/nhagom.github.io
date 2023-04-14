import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { Customers } from '../models/customers';
import { ICustomer } from '../interfaces/customers';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  login(email: any, password: any) {
    throw new Error('Method not implemented.');
  }
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
  // update pass
  putPassword(aCustomer:any, email:string):Observable<any>{
  const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
  const requestOptions:Object={
    headers:headers,
    responseType:"text"
  }
  return this._http.put<any>("/customers/" +email, JSON.stringify(aCustomer),requestOptions).pipe(
    map(res=>JSON.parse(res) as Array<ICustomer>),
    retry(3),
    catchError(this.handleError)
  )
}
//kiểm tra email không tồn tại
checkEmailExists(email: string): Observable<boolean> {
  return this._http.get<any>(`/customers/check-email-invalid/${email}`).pipe(
    map(res => res as boolean),
    catchError(this.handleError)
  );
}

}
