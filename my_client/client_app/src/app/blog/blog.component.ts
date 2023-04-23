import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogListService } from '../services/blog-list.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  blogs:any
  errMessage:string=''
  constructor(public _service: BlogListService,private _router: Router){
    this._service.getBlogs().subscribe({
      next:(data: any)=>{this.blogs=data},
      error:(err: string)=>{this.errMessage=err}
    })
  }
  detailBlog(b:any){
    this._router.navigate(['blog-detail',b._id])
  }
}
