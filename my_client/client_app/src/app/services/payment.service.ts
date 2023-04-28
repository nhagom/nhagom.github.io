import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, retry, throwError } from 'rxjs';
import { ICustomer } from '../interfaces/customers';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  user:string = ""
  public userSubject = new BehaviorSubject<any>({
    User:this.user
  })
  constructor(private _http: HttpClient) {
    //lấy customerEmail nếu có từ local storage
    const userData = localStorage.getItem('customerEmail');
    if (userData) {
      this.user = userData
    }

    //phát ra giá trị hiện tại của user đến tất cả các subcribe
    this.userSubject.next({
      User: this.user
    })

    window.addEventListener('beforeunload', () => {
      localStorage.removeItem('customerEmail');
    })
  }

  getUser(): Observable<any> {
    return this.userSubject
  }

  getCustomerInfo(email:string):Observable<any> {
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

  postOrder(aOrder:any):Observable<any> {
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.post<any>("/orders",JSON.stringify(aOrder),requestOptions).pipe(
      map(res=>(res) as string),
      retry(3),
      catchError(this.handleError)
    )
  }
}
