import { Component } from '@angular/core';
import { ProductApiService } from '../services/product-api.service';
import { BlogListService } from '../services/blog-list.service';
import { Product } from 'src/Product';
import { Router } from '@angular/router';
import { PopularProductsService } from '../services/popular-products.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  products: Product[] = [];
  blogs:any;
  errMessage:string="";
  Styles: any;
  popularProducts:any;
  constructor(private _service:ProductApiService, private _service1:BlogListService,
              public router:Router, private _service2:PopularProductsService){
    this._service.getProducts().subscribe({
      next:(data: any)=>{this.products=data},
      error:(err: string)=>{this.errMessage=err}
    });
    this._service1.getBlogs().subscribe({
      next:(data: any)=>{this.blogs=data},
      error:(err: string)=>{this.errMessage=err}
    });
    this._service2.getPopularProducts().subscribe({
      next:(data:any)=>{this.popularProducts=data},
      error:(err:string)=>{this.errMessage=err}
    })
  }
  detailBlog(b:any){
    this.router.navigate(['blog-detail',b._id])
  }
  DetailProduct(d:any){
    this.router.navigate(['product-detail',d._id])
  }
  getProductStyle(productStyle:string){
    this._service.getProductStyle(productStyle).subscribe({
      next: (data) => {
        this.products = data;
        console.log("Style",data); this.Styles = [...new Set(this.products.map(product=> product.style))]},
      error: (err) => {
        this.errMessage = err;
      },
    });
  }
}
