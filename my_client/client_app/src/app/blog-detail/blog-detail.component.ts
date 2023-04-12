import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogListService } from '../services/blog-list.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent {
  blogDetail:any
  blogs:any
  errMessage:string=''
  selectedBlogId:any
  ngOnInit():void{
    this.selectedBlogId=this._service.selectedBlogId
  }
  constructor(public _service: BlogListService,private _router: Router, private activateRoute: ActivatedRoute){
    activateRoute.paramMap.subscribe(
      (param)=>{
        let id=param.get('id')
        if(id!=null){
          this._service.getBlog(id).subscribe({
            next:(data: any)=>{this.blogDetail=data},
            error:(err: string)=>{this.errMessage=err}
          })
        }
      }
    )
    this._service.getBlogs().subscribe({
      next:(data: any)=>{this.blogs=data},
      error:(err: string)=>{this.errMessage=err}
    })
  }

}
