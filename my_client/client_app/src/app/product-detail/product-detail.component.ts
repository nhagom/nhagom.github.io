import { Component } from '@angular/core';
import { ProductApiService } from '../services/product-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  product: any;
  errMessage:string=''
  constructor(private _service: ProductApiService, private activateRoute: ActivatedRoute, private router:Router, private cartService: CartService, private http: HttpClient){
    activateRoute.paramMap.subscribe(
      (param)=>{
        let id=param.get('id');
        if(id!=null){
          this._service.getProduct(id).subscribe({
          next: (data)=>{this.product=data},
          error: (err)=>{this.errMessage=err}
          })
        }
      }
    )
  }

  //cart
  quantity = 0
  addToCart(product:any, quantity:number){
    this.cartService.addToCart(product,quantity)
  }

}
