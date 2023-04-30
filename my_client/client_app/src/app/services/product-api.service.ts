import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IProduct, Product } from '../interfaces/Product';

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

  getProductNewest(): Observable<any>
  {  const headers=new HttpHeaders().set("Content-Type", "text/plain; charset=utf-8")
     const requestOptions:Object={
        headers: headers,
        responseType:"text"
  }
  return this._http.get<any>("/products-newest", requestOptions).pipe(
     map(res =>JSON.parse(res) as Array<IProduct>), retry(3),
     catchError(this.handleError))
  }


  getProductStyle(productStyle:string):Observable<any>
  {
    const header=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:header,
      responseType:"text"
    }
    return this._http.get<any>("/products-get/"+productStyle,requestOptions).pipe(
      map((res) => JSON.parse(res) as Array<Product>),
      retry(3),
      catchError(this.handleError)
    );
  }

  getProductsByCategoryStyle(productStyle:string): Observable<any>{
    const headers = new HttpHeaders().set("Content-Type", "text/plain; charset=utf-8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };
      return this._http.get<any>("/products/by-category/"+productStyle, requestOptions).pipe(
        map(res =>JSON.parse(res) as Array<Product>),
        retry(3),
        catchError(this.handleError))
    }

    getProductsBySearchName(proName:string): Observable<any>{
      const headers = new HttpHeaders().set("Content-Type", "text/plain; charset=utf-8");
      const requestOptions: Object = {
        headers: headers,
        responseType: "text"
      };
        return this._http.get<any>("/products/by-search/"+proName, requestOptions).pipe(
          map(res =>JSON.parse(res) as Array<Product>),
          retry(3),
          catchError(this.handleError))
      }

  // getMinMax(min:string, max:string):Observable<any>
  // {
  // const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
  // const requestOptions:Object={
  // headers:headers,
  // responseType:"text"
  // }
  // return this._http.get<any>("/products/"+min +"/"+max,requestOptions).pipe(
  // map(res=>JSON.parse(res) as IProduct),
  // retry(3),
  // catchError(this.handleError))
  // }


  //10 Sản phẩm mới nhất
  getNewestProducts(): Observable<any>{
    const headers = new HttpHeaders().set("Content-Type", "text/plain; charset=utf-8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };
    return this._http.get<any>("/products/newest", requestOptions).pipe(
      map(res => JSON.parse(res) as Array<Product>),
      retry(3),
      catchError(this.handleError)
    );
  }


  sortProductsByPrice(): Observable<IProduct[]> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain; charset=utf-8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };

    return this._http.get<any>("/products-sort-by-price/", requestOptions).pipe(
      map(res => JSON.parse(res) as IProduct[]),
      retry(3),
      catchError(this.handleError)
    );
  }

}


