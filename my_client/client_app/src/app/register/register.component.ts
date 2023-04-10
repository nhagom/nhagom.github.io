import { Component } from '@angular/core';
import { Customers } from '../models/customers';
import { RegisterService } from '../services/register.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { customerValidator, passwordValidator } from '../check.validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  customer =new Customers();
  errMessage:string=''

  regForm: any;
  errFlag: boolean = false;
  constructor(private formBuilder: FormBuilder, private _service: RegisterService){}

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3),customerValidator]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      birth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPass: ['', [Validators.required]]
    }, { validators: passwordValidator });
  }

  validateGender(value:any):void{
    if(value === 'none')
    this.errFlag = true;
    else
    this.errFlag = false;
  }
  get name(){
    return this.regForm.controls['name']
  }
  get email(){
    return this.regForm.controls['email']
  }
  get confirmPass(){
    return this.regForm.controls['confirmPass']
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


