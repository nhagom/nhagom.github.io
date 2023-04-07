import { Component } from '@angular/core';

import {FormBuilder, Validators } from '@angular/forms';
import { customerValidator, passwordValidator } from '../check.validator';
import { Customers } from '../models/customers';
import { RegisterService } from '../services/register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // email: string='';
  // password: string='';
  // error: string='';

  // constructor(private router: Router, private storageService: SessionStorageService) {}

  // register() {
  //   const users = this.storageService.getUsers();
  //   const user = users.find(u => u.email === this.email);
  //   if (user) {
  //     this.error = 'Email already registered';
  //   } else {
  //     const newUser = { email: this.email, password: this.password };
  //     this.storageService.addUser(newUser);
  //     this.router.navigate(['/login']);
  //   }
  // }

  regForm: any;
  constructor(private formBuilder: FormBuilder, private _service: RegisterService){
    this.regForm= this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), customerValidator]],
      email: ['', [Validators.required]],
      password: [''],
      confirmPassword: ['']
   }, {validators: [passwordValidator]})
  }
  get name(){
    return this.regForm.controls['name']
  }
  get email(){
    return this.regForm.controls['email']
  }

  customer =new Customers();
  errMessage:string=''
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


