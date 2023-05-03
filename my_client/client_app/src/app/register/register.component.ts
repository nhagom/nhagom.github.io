import { Component} from '@angular/core';
import { Customers } from '../models/customers';
import { RegisterService } from '../services/register.service';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { customerValidator, passwordValidator } from '../check.validator';
import { Observable, catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  customer =new Customers();
  errMessage:string=''
  cusInfo:any
  emailExist=false
  regForm: any;
  errFlag: boolean = false;
  constructor(private fb: FormBuilder, private _service: RegisterService, private router: Router){
    this.regForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3),customerValidator]],
      email: ['', [Validators.required, Validators.email],[this.emailExistsValidator()]],
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
  emailExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this._service.checkEmailExists(control.value).pipe(
        map(res => {
          return res ? { emailExist: true } : null;
        }),
        catchError(() => of(null)) // Thay vì trả về null, trả về Observable rỗng
      );
    };
  }
  checkEmail() {
    if (this.customer.customerEmail !== this.cusInfo.customerEmail) {
      this._service.checkEmailExists(this.customer.customerEmail).subscribe({
        next:(data)=>{this.emailExist=data;
          if (this.emailExist) {
            this.regForm.controls['email'].setErrors({emailExist: true});
          } else {
            this.regForm.controls['email'].setErrors(null);
          }}
      });
    }
  }
  postCustomers(){
    this._service.postCustomers(this.customer).subscribe({
      next:(data)=>{this.cusInfo=data},
      error:(err)=>{this.errMessage=err}
    })
  }
  goToLoginPage() {
    this.router.navigate(['/login']);
  }
}


