import { Component } from '@angular/core';
import { ProductApiService } from '../services/product-api.service';
import { Router } from '@angular/router';
import { Product } from 'src/Product';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.css']
})
export class ProductAllComponent {
  products: Product[] = [];
  errMessage: string = '';
  Styles: any;
  constructor(public _service: ProductApiService, public router: Router) {
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

}
