import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../interfaces/blogs';
import { BlogListService } from '../services/blog-list.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  blogs: Blog[] = []
  errMessage:string=''
  images: string[] = [
    '/assets/Cover-3-01.jpg',
    '/assets/Cover-2-02.jpg',
    '/assets/cover-2.3-01.jpg'
  ];
  currentImage: number = 0;
  ngOnInit(): void {
    setInterval(() => {
      this.currentImage = (this.currentImage + 1) % this.images.length;
    }, 5000); // Change image every 5 seconds
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
}
