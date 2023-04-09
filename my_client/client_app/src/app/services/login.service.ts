import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private _http: HttpClient) { }

  postLogin(email: string, password: string) :Observable<any> {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    const url = `/customers/login`;
    const body = { email, password };
    return this._http.post(url, body);
  }

  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }
}
