import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IProduct } from '../interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(private _http: HttpClient) { }

  getProducts(): Observable<any>
    {  const headers=new HttpHeaders().set("Content-Type", "text/plain; charset=utf-8")
       const requestOptions:Object={
          headers: headers,
          responseType:"text"
    }
    return this._http.get<any>("/products", requestOptions).pipe(
       map(res =>JSON.parse(res) as Array<IProduct>), retry(3),
       catchError(this.handleError))
    }
    handleError(error: HttpErrorResponse){
      return throwError(() =>new Error(error.message))
    }

  getProduct(productId:string): Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type", "text/plain; charset=utf-8")
    const requestOptions:Object={
      headers: headers,
      responseType:"text"
  }
    return this._http.get<any>("/products/"+productId, requestOptions).pipe(
      map(res =>JSON.parse(res) as IProduct),
      retry(3),
      catchError(this.handleError))
  }
}
