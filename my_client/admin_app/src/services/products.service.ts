import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { IProduct } from 'src/interface/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private _http: HttpClient) { }

  getProducts(): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain; charset=utf-8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };
    return this._http.get<any>("/products", requestOptions).pipe(
      map(res => JSON.parse(res) as Array<IProduct>),
      retry(3),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }




  deleteProduct(productId: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8");
    const requestOptions: object = {
      headers: headers,
      responseType: "text"
    };
    return this._http.delete<any>("/products/delete/" + productId, requestOptions).pipe(
      map(res => JSON.parse(res) as Array<IProduct>),
      retry(3),
      catchError(this.handleError)
    );
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    const headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8");
    const requestOptions: object = {
      headers: headers
    };
    const url = `/products/update/${product.productId}`;
    return this._http.put<IProduct>(url, product, requestOptions).pipe(
      catchError(this.handleError)
    );
  }

  addProduct(product: IProduct): Observable<IProduct> {
    const headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8");
    const requestOptions: object = {
      headers: headers
    };
    const url = "/products/add";
    return this._http.post<IProduct>(url, product, requestOptions).pipe(
      catchError(this.handleError)
    );
  }

  checkProductId(productId: string): Observable<boolean> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain; charset=utf-8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };
    return this._http.get<any>(`/products/check/${productId}`, requestOptions).pipe(
      map(res => JSON.parse(res) as boolean),
      retry(3),
      catchError(this.handleError)
    );
  }
}
