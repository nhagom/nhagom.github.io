import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { IBlog } from '../interfaces/blogs';

@Injectable({
  providedIn: 'root'
})
export class BlogListService {

  constructor(private _http:HttpClient) { }
  getBlogs():Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.get<any>("/blogs",requestOptions).pipe(
      map(res=>JSON.parse(res) as IBlog),
      retry(3),
      catchError(this.handleError)
    )
  }
  handleError(error:HttpErrorResponse){
    return throwError(()=> new Error(error.message))
  }
}
