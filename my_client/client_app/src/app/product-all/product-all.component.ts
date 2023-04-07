import { Component } from '@angular/core';
import { ProductApiService } from '../services/product-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-all',
  templateUrl: './product-all.component.html',
  styleUrls: ['./product-all.component.css']
})
export class ProductAllComponent {
  [x: string]: any;
  products: any;
  errMessage:string=''

  constructor(public _service: ProductApiService, private router:Router){
    this._service.getProducts().subscribe({
    next: (data)=>{this.products=data},
    error: (err)=>{this.errMessage=err}
  })
  }

  DetailProduct(d:any){
    this.router.navigate(['product-detail',d._id])
  }
}
