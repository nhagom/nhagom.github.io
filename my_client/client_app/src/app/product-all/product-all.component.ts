import { Component } from '@angular/core';
import { ProductApiService } from '../services/product-api.service';
import { Router } from '@angular/router';
import { IProduct } from '../interfaces/Product';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.css']
})
export class ProductAllComponent {
  products: any;
  errMessage: string = '';
  constructor(public _service: ProductApiService, public router: Router) {
    this._service.getProducts().subscribe({
        next: (data)=>{this.products=data},
        error: (err)=>{this.errMessage=err}
    });
  }
  ViewProduct(p:any){
    this.router.navigate(['product-detail', p._id])
  }
}
