import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Customers } from '../models/customers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  customer =new Customers();
  errMessage:string=''
  constructor(private _service: LoginService){

  }
  public setCustomer(c:Customers){
    this.customer=c
  }
  postCustomers(){
    this._service.postCustomers(this.customer).subscribe({
      next:(data)=>{this.customer=data},
      error:(err)=>{this.errMessage=err}
    })
  }

}

