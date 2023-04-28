import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Customers } from 'src/app/models/customers';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { IUser } from 'src/app/interfaces/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  customer =new Customers();
  errMessage:string=''
  logForm: any;
  cusInfo:any
  check = false
  customerName = '';
  emailExist=false
  constructor(private formBuilder: FormBuilder, private _service: LoginService, private router: Router, private route: ActivatedRoute, private _http:HttpClientModule){}
  //login
  aUser = new IUser()
  // onSubmit(aUser: any): void {
  //   this._service.getUsers(aUser).subscribe({
  //     next:(data) => {
  //       if(data) {
  //         localStorage.setItem('email', aUser.customerEmail);
  //         localStorage.setItem('password', aUser.password);
  //         this.router.navigate(['/blog']);
  //       } else {
  //         console.log("error");
  //       }
  //     },
  //     error:(err) => { console.log(err)}
  //   });
  // }
  onSubmit(aUser: any): void {
    this._service.getUsers(aUser).subscribe({
      next:(data) => {
        this.check = data;
        if (this.check) {
          localStorage.setItem('customerEmail', aUser.customerEmail);
          this._service.getCustomerName().subscribe({
            next: (data) => {
              this.customerName = data.customerName;
            },
            error: (err) => {
              console.log(err);
            },
          });
          this.router.navigate(['/home']);
        } else {
          console.log("error");
        }
      }
    });
  }

  // validator
  ngOnInit() {
    this.logForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email],[this.emailExistsValidator()]],
      password: ['', [Validators.required]],
    });
  }
  get email(){
    return this.logForm.controls['email']
  }
  // di chuyển trang khác
  goToRegister() {
    this.router.navigate(['/register']);
  }
  goToForgotPassword(){
    this.router.navigate(['/forgotpassword']);
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
          this.cusInfo = data;
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

