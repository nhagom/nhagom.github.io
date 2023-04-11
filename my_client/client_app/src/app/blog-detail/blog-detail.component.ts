import { Component } from '@angular/core';
import { BlogListService } from '../services/blog-list.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent {
  blogs:any
  errMessage:string=''
  selectedBlogId:any
  ngOnInit():void{
    this.selectedBlogId=this._service.selectedBlogId
  }
  constructor(public _service: BlogListService){
    this._service.getBlogs().subscribe({
      next:(data: any)=>{this.blogs=data},
      error:(err: string)=>{this.errMessage=err}
    })
  }
}
