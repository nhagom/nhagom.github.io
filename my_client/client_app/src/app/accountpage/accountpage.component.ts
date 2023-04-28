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
  successMsg = '';
  emailExist=false;
  email = ""

  constructor(private _service: AccountPageService,  ) {
    let _email = localStorage.getItem('customerEmail');
    if (_email){
      this.email = _email

    }
    this._service.getCustomerInfo(this.email).subscribe({
      next:(data)=>{
          this.cusInfo=data;
          this.aCus = {...this.cusInfo};
      },
      error:(err)=>{this.errMessage=err}
    })
    this._service.getPurchaseHistory(this.email).subscribe({
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

  updateCusInfo() {
    this._service.updateCusInfo(this.aCus, this.email).subscribe({
      next:(data)=>{this.cusInfo=data},
      error:(err)=>{this.errMessage=err},

    })
    this.successMsg = 'Cập nhật thông tin khách hàng thành công!';
    setTimeout(() => { this.hideSuccessMsg(); }, 5000);

  }

  hideSuccessMsg() {
    this.successMsg = '';
  }

  // checkEmail() {
  //   if (this.aCus.customerEmail !== this.cusInfo.customerEmail) {
  //     this._service.checkEmailExists(this.aCus.customerEmail).subscribe({
  //       next:(data)=>{this.emailExist=data},
  //     });
  //   }
  // }
}
