import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http: HttpClient) { }
  getAdmin(aUser: any): Observable<any> {
    const requestOptions: Object = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    return this._http.post<any>("/admin", JSON.stringify(aUser), requestOptions).pipe(
      map(res => res as boolean),
      catchError(this.handleError)
    );
  }
  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }
}
