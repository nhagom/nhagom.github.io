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
  prod: Product[] = [];
  errMessage: string = '';
  
  isFiltered: boolean = false;

  //phân trang
  p: number=1;
  itemsPerPage: number = 16;
  totalProduct: any;

  //search
  searchText: any;
  Styles: any;
  Names: any;

  //Sắp xếp
  sortOrder: string = '';
  sortPrice: string = '';

  // key = "Giaban";
  // reverse: boolean = false;

  //lọc giá
  minPrice: number = 0;
  maxPrice: number = 0;

constructor(public _service: ProductApiService, public router: Router, private cartService: CartService) {
    this._service.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.totalProduct = data.length;},
      error: (err) => {this.errMessage = err;},
    });
  }
  getProducts(){
    if (this.isFiltered) {
      this.getProductsByPriceRange(this.minPrice, this.maxPrice);
    } else {
      this._service.getProducts().subscribe({
        next: (data) => {
          this.products = data;
          this.totalProduct = data.length;
        },
        error: (err) => {
          this.errMessage = err;
        },
      });
    }
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

  //minma
  getProductsByPriceRange(min: number, max: number) {
    this.isFiltered = true;
    this._service.getProductsByPriceRange(min, max).subscribe({
      next: (data) => {
        this.products = data;
        this.totalProduct = data.length;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }

  cancelFilter() {
    this.isFiltered = false;
    this.getProducts(); // Gọi lại phương thức để lấy danh sách sản phẩm ban đầu
  }
  
  onPriceFilterSubmit() {
    this.getProductsByPriceRange(this.minPrice, this.maxPrice);
  }


  sortProduct() {
    this._service.sortProductsByPrice().subscribe({
      next: (data) => {this.products = data;},
      error: (err) => {this.errMessage = err;},
    });
  }
  reset() {
    // Thực hiện logic để đặt lại giá trị sortPrice về giá trị mặc định
    this.sortPrice = '';
    this.sortOrder = '';
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
