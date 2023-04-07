import { Component } from '@angular/core';
import { AccountPageService } from '../services/account-page.service';

@Component({
  selector: 'app-accountpage',
  templateUrl: './accountpage.component.html',
  styleUrls: ['./accountpage.component.css']
})
export class AccountpageComponent {
  active = 1;
  cusInfo:any
  purchaseHistory:any
  errMessage=''
  constructor(private _service: AccountPageService) {}
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
}
