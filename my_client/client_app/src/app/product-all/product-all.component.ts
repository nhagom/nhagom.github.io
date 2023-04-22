import { Component, ViewChild } from '@angular/core';
import { ProductApiService } from '../services/product-api.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IProduct, Product } from '../interfaces/Product';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.css']
})
export class ProductAllComponent {
  products: Product[] = [];
  errMessage: string = '';
  p: number=1
  Styles: any;
  constructor(public _service: ProductApiService, public router: Router, private cartService: CartService ) {
    this._service.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      console.log("Style",data); this.Styles = [...new Set(this.products.map(product=> product.style))]},
      error: (err) => {this.errMessage = err;},
    });
  }

  DetailProduct(d:any){
    this.router.navigate(['product-detail',d._id])
  }


  getProductStyle(productStyle:string)
  {
    this._service.getProductStyle(productStyle).subscribe({
      next: (data) => {
        this.products = data;
      console.log("Style",data); this.Styles = [...new Set(this.products.map(product=> product.style))]},
      error: (err) => {
        this.errMessage = err;
      },
    });
  }


  //cart
  product: any
  addToCart(id:any){
    this._service.getProduct(id).subscribe({
      next: (data)=>{this.product=data},
    })
    this.cartService.addToCart(this.product,1)
  }
}
