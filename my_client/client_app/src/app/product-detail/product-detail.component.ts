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
  cartService: any;
  constructor(private _service: ProductApiService, private activateRoute: ActivatedRoute, private router:Router, cartService: CartService, private http: HttpClient){
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
  masp: any;
  num: number = 1;
  products: any;
  dataError: any;

  ngOnInit(): void {
    this.masp = this.activateRoute.snapshot.queryParamMap.get('masp');

    this._service.getProducts().subscribe({
      next: (data)=>{this.products=data},
      error: (err)=>{this.dataError=err}
      })
  }

  minusQuantity() {
    if (this.num > 1) {
      this.num--;
    }
  }

  plusQuantity() {
    this.num++;
  }

  index() {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id == this.masp) {
        return i;
        break;
      }
    }
    return -1;
  }

  addProduct() {
    const index = this.index();
    if (index !== undefined) {
      this.cartService.addItem(this.products[index]);
      ($("#myToast") as any).toast("show");
    }
  }
  getCart() {
    return this.cartService.getCart();
  }

}
