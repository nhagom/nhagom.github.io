import { Component, ViewChild } from '@angular/core';
import { ProductApiService } from '../services/product-api.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct, Product } from '../interfaces/Product';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.css']
})
export class ProductAllComponent {
  products: Product[] = [];
  errMessage: string = '';


  Styles: any;
  constructor(public _service: ProductApiService, public router: Router, private cartService: CartService ) {
    this._service.getProductNewest().subscribe({
      next: (data) => {
        this.products = data;
      console.log("Style",data); this.Styles = [...new Set(this.products.map(product=> product.style))]},
      error: (err) => {this.errMessage = err;},
    });
  }




  DetailProduct(d:any){
    this.router.navigate(['product-detail',d._id])
  }

  //cart
  product: any
  quantity = 1
  item=new Cart()
  addToCart(po:any){
    this._service.getProduct(po._id).subscribe({
      next: (data)=>{this.product=data},
    })
    this.item.productId = this.product.productId,
    this.item.productName = this.product.productName,
    this.item.image = this.product.image,
    this.item.price = this.product.price,
    this.cartService.addToCart(this.item, this.quantity)
  }

}
