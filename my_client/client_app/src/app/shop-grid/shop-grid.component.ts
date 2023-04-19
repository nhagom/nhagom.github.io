import { Component } from '@angular/core';
import { Product } from '../interfaces/Product';
import { ProductApiService } from '../services/product-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-grid',
  templateUrl: './shop-grid.component.html',
  styleUrls: ['./shop-grid.component.css',
  '../../assets/css/styles.css',
  '../../assets/shop-product.scss',
  '../../assets/css/bootstrap.min.css',
  '../../assets/css/font-awesome.min.css',
  '../../assets/css/nice-select.css',
  '../../assets/css/elegant-icons.css',
  '../../assets/css/slicknav.min.css'
]

})
export class ShopGridComponent {
  products: Product[] = [];
  errMessage: string = '';
  p: number=1;
  searchText: any;
  uniqueStyles: any;
    constructor(public _service: ProductApiService, public router: Router) {
    this._service.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      console.log("Style",data); this.uniqueStyles = [...new Set(this.products.map(product=> product.style))]},
      error: (err) => {this.errMessage = err;},
    });
  }

  DetailProduct(d:any){
    this.router.navigate(['product-detail',d._id])
  }


  getProductStyle(productStyle:string)
  {
    this._service.getProductStyle(productStyle).subscribe({
      next: (data)=>{this.products=data; console.log("hii",data); this.uniqueStyles = [...new Set(this.products.map(item => item.style))]},
      error: (err)=>{this.errMessage=err},
    })
  }


}
