import { Component } from '@angular/core';
import { BlogListService } from '../services/blog-list.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  blogs:any
  errMessage:string=''
  selectedBlogId:any
  ngOnInit():void{
    this.selectedBlogId=this._service.selectedBlogId
  }
  constructor(public _service: BlogListService){
    this._service.getBlogs().subscribe({
      next:(data)=>{this.blogs=data},
      error:(err)=>{this.errMessage=err}
    })
  }
}
