import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { IOrder } from 'src/interface/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private ordersUrl = '/orders';
  constructor(private _http: HttpClient) { }

    getOrders():Observable<any>{
      const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
      const requestOptions:Object={
        headers:headers,
        responseType:"text"
      }
      return this._http.get<any>("/orders",requestOptions).pipe(
        map(res=>JSON.parse(res) as Array<IOrder>),
        retry(3),
        catchError(this.handleError)
      )
    }

    getOrdersInRange(start: string, end: string): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      const params = {
        start: start,
        end: end
      }

      return this._http.get<any>(`${this.ordersUrl}/${params.start}/${params.end}`, { headers: headers }).pipe(
        map(res => res),
        retry(3),
        catchError(this.handleError)
      );
    }
    handleError(error:HttpErrorResponse){
      return throwError(()=>new Error(error.message))
    }
}
