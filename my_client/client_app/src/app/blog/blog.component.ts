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
  selectedBlogId:any
  ngOnInit():void{
    this.selectedBlogId=this._service.selectedBlogId
  }
  constructor(public _service: BlogListService,private _router: Router){
    this._service.getBlogs().subscribe({
      next:(data: any)=>{this.blogs=data},
      error:(err: string)=>{this.errMessage=err}
    })
  }
  detailBlog(b:any){
    this._router.navigate(['blog-detail',b._id])
  }
  // getBlogId(){
  //   this._activatedRoute.paramMap.subscribe((param)=>{
  //     let blogId = param.get('code');
  //     if(blogId!=null)
  //       this.selectedBlogId=parseInt(blogId);
  //       console.log(this.selectedBlogId);
  //   })
  // }
  // onSelectBlog(data:any):void{
  //   this._router.navigate(['/blog-detail/',data.id]);
  //   this._service.selectedBlogId=data.id;
  // }
  // isSelectedBlog(b:any):boolean{
  //   return b.id === this.selectedBlogId;
  // }
}
