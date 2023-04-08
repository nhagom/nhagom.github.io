import { Component } from '@angular/core';
import { AccountPageService } from '../services/account-page.service';
import { Customers } from '../models/customers';

@Component({
  selector: 'app-accountpage',
  templateUrl: './accountpage.component.html',
  styleUrls: ['./accountpage.component.css']
})
export class AccountpageComponent {
  cusInfo:any
  aCus=new Customers();
  purchaseHistory:any
  errMessage=''
  constructor(private _service: AccountPageService) {

  }
  getInfo(ID:string){
    this._service.getCustomerInfo(ID).subscribe({
      next:(data)=>{this.cusInfo=data},
      error:(err)=>{this.errMessage=err}
    })
  }

  getPurchaseHistory(ID:string){
    this._service.getPurchaseHistory(ID).subscribe({
      next:(data)=>{this.purchaseHistory=data},
      error:(err)=>{this.errMessage=err}
    })
  }

  calculateTotal(p: any): number {
    let total = 0;
    for (let item of p.orderItems) {
      total += item.quantity * item.price;
    }
    return total;
  }

  updateCusInfo(ID:string) {
    this._service.updateCusInfo(this.aCus, ID).subscribe({
      next:(data)=>{this.cusInfo=data},
      error:(err)=>{this.errMessage=err}
    })
  }

}
