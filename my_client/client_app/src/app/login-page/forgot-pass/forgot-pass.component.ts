import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Customers } from 'src/app/models/customers';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { passwordValidator } from 'src/app/check.validator';
import { Observable, catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent {
  customer =new Customers();
  errMessage:string=''
  logForm: any;
  cusInfo:any

  emailExist=false
  errFlag: boolean = false;
  constructor(private formBuilder: FormBuilder, private _service: LoginService, private router: Router, private route: ActivatedRoute, private _http:HttpClientModule){
  }

  // validator
  ngOnInit() {
    this.logForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email],[this.emailExistsValidator()]],
      password: ['', [Validators.required]],
      confirmPass: ['', [Validators.required]]
    }, { validators: passwordValidator });
  }
  putPassword(email:string){
    this._service.putPassword(this.customer,email).subscribe({
      next:(data)=>{this.customer=data},
      error:(err)=>{this.errMessage=err}
    })
  }
  //kiểm tra email không tồn tại

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
        next:(data)=>{
          this.emailExist = data;
          if (!this.emailExist) {  // Kiểm tra !this.emailExist thay vì this.emailExist
            this.logForm.controls['email'].setErrors({emailExist: true});
          } else {
            this.logForm.controls['email'].setErrors(null);
          }
        }}
      );
    }
  }
}
