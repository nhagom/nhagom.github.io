import { Component } from '@angular/core';
import { Product } from '../interfaces/Product';
import { ProductApiService } from '../services/product-api.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-shop-grid',
  templateUrl: './shop-grid.component.html',
  styleUrls: ['./shop-grid.component.css',
  '../../assets/css/styles.css',
  '../../assets/shop-product.scss',
  '../../assets/css/font-awesome.min.css',
  '../../assets/css/nice-select.css',
  '../../assets/css/elegant-icons.css',
  '../../assets/css/slicknav.min.css'
]

})
export class ShopGridComponent {
  products: Product[] = [];
  errMessage: string = '';

  //phân trang
  p: number=1;
  itemsPerPage: number = 12;
  totalProduct: any;

  //search
  searchText: any;
  Styles: any;
  Names: any;

  //Sắp xếp
  sortOrder: string = '';

  // key = "Giaban";
  // reverse: boolean = false;


  disabled = false;
  value2 = [50000, 5000000];
  // value2 = [0, 10000000];


constructor(public _service: ProductApiService, public router: Router, private cartService: CartService) {
    this._service.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.totalProduct = data.length;},
      error: (err) => {this.errMessage = err;},
    });
  }


  DetailProduct(d:any){
    this.router.navigate(['product-detail',d._id])
  }


  getProductsByCategoryStyle(productStyle:string)
  {
    this._service.getProductsByCategoryStyle(productStyle).subscribe({
      next: (data) => {
        this.products = data;
      console.log("Style",data);
        this.Styles = [...new Set(this.products.map(product=> product.style))]},
      error: (err) => {
        this.errMessage = err;
      },
    });
  }
  
  getProductsBySearchName(proName:string)
  {
    this._service.getProductsBySearchName(proName).subscribe({
      next: (data) => {
        this.products = data;
      console.log("Name",data);
        this.Names = [...new Set(this.products.map(product=> product.productName))]},
      error: (err) => {
        this.errMessage = err;
      },
    });
  }
  // MM(max:string, min:string )
  // {
  // this._service.getMinMax(max,min).subscribe({
  // next:(data)=>{this.products=data},
  // error:(err)=>{this.errMessage=err}
  // })
  // }

  sortProduct() {
    this._service.sortProductsByPrice().subscribe({
      next: (data) => {this.products = data;},
      error: (err) => {this.errMessage = err;},
    });
  }


  // sort() {
  //   this.reverse = false
  // }
  // sort2() {
  //   this.reverse = true
  // }

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
