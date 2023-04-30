import { Component } from '@angular/core';
import { ProductApiService } from '../services/product-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../models/cart';
import { Product } from '../interfaces/Product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  product: any;
  products: Product[] = []; //Sản phẩm liên quan
  Styles: any;
  
  //phân trang
  p: number=1;
  itemsPerPage: number = 4;
  totalProduct: any;

  errMessage:string=''
  constructor(private _service: ProductApiService, private activateRoute: ActivatedRoute, private router:Router, private cartService: CartService, private http: HttpClient){
    activateRoute.paramMap.subscribe(
      (param)=>{
        let id=param.get('id');
        if(id!=null){
          this._service.getProduct(id).subscribe({
          next: (data)=>{this.product=data,
            this._service.getProductsByCategoryStyle(this.product.style).subscribe({
            next: (data) => {this.products = data;
            console.log("Style",data);
            this.Styles = [...new Set(this.products.map(product=> product.style))]},
            error: (err) => {this.errMessage = err;},
          }); },
          error: (err)=>{this.errMessage=err}
          })
        }

      }
    )
  }



  DetailProduct(d:any){
    this.router.navigate(['product-detail',d._id])
  }

  // getProductsByCategoryStyle(productStyle:string)
  // {
  //   this._service.getProductsByCategoryStyle(productStyle).subscribe({
  //     next: (data) => {
  //       this.products = data;
  //     console.log("Style",data);
  //       this.Styles = [...new Set(this.products.map(product=> product.style))]},
  //     error: (err) => {
  //       this.errMessage = err;
  //     },
  //   });
  // }

  //cart
  quantity = 1
  item=new Cart()
  addToCart(product:any, quantity:number){
    this.item.productId = this.product.productId
    this.item.productName = this.product.productName,
    this.item.image = this.product.image,
    this.item.price = this.product.price,
    this.cartService.addToCart(this.item,quantity)
  }

}
