import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { IBlog } from 'src/interface/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor(private _http: HttpClient) { }

  getBlogs(): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain; charset=utf-8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };
    return this._http.get<any>("/blogs", requestOptions).pipe(
      map(res => JSON.parse(res) as Array<IBlog>),
      retry(3),
      catchError(this.handleError)
    );
  }
  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }

  deleteBlog(blogId: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8");
    const requestOptions: object = {
      headers: headers,
      responseType: "text"
    };
    return this._http.delete<any>("/blogs/delete/" + blogId, requestOptions).pipe(
      map(res => JSON.parse(res) as Array<IBlog>),
      retry(3),
      catchError(this.handleError)
    );
  }
  updateBlog(blog: IBlog): Observable<IBlog> {
    const headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8");
    const requestOptions: object = {
      headers: headers
    };
    const url = `/blogs/update/${blog.blogId}`;
    return this._http.put<IBlog>(url, blog, requestOptions).pipe(
      catchError(this.handleError)
    );
  }

  addBlog(blog: IBlog): Observable<IBlog> {
    const headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8");
    const requestOptions: object = {
      headers: headers
    };
    const url = "/blogs/add";
    return this._http.post<IBlog>(url, blog, requestOptions).pipe(
      catchError(this.handleError)
    );
  }

  checkBlogId(blogId: string): Observable<boolean> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain; charset=utf-8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };
    return this._http.get<any>(`/blogs/check/${blogId}`, requestOptions).pipe(
      map(res => JSON.parse(res) as boolean),
      retry(3),
      catchError(this.handleError)
    );
  }

}
