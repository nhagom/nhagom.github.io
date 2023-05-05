import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Customers } from 'src/app/models/customers';
import { AbstractControl, AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { passwordValidator } from 'src/app/check.validator';
import { Observable, catchError, map, of } from 'rxjs';
import { AccountPageService } from 'src/app/services/account-page.service';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/User';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {
  logForm: any;
  cusInfo:any
  currentStep: number = 1;
  code: string ="";
  errMessage:string=''
  emailExist: boolean = true;
  customer: any = {
  // customerEmail: '',
  password: ''

  };
  constructor(private formBuilder: FormBuilder, private _service: LoginService, private service:AccountPageService, private router: Router) { }

  ngOnInit() {
    this.logForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email], [this.emailExistsValidator()]],
      code: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get email(){
    return this.logForm.controls['email']
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
        next:(data)=>{
          this.emailExist = data;
          if (!this.emailExist) { // Kiểm tra !this.emailExist thay vì this.emailExist
            this.logForm.controls['email'].setErrors({emailExist: true});
          } else {
            this.logForm.controls['email'].setErrors(null);
          }
        }
      });
    }
  }
  goToStep(step: number) {
    if (step === 2) {
    } else if (step === 3) {
    }
    this.currentStep = step;
  }

  onSubmit(email: string) {
    // Lấy thông tin khách hàng từ database
    this.service.getCustomerInfo(email).subscribe({
      next: (data) => {
        // Lưu các thông tin khác của khách hàng vào biến tạm thời
        const tempCustomer = {
          customerID: data.customerID,
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          customerPhoneNumb: data.customerPhoneNumb,
          customerBirth: data.customerBirth,
          customerGender: data.customerGender,
          customerAddress: data.customerAddress
        };

        // Cập nhật mật khẩu mới cho khách hàng
        this._service.putPassword(this.customer, email).subscribe({
          next: (data) => {
            // Nếu thay đổi mật khẩu thành công, cập nhật lại các thông tin khác của khách hàng vào database
            this.service.updateCusInfo(tempCustomer,email).subscribe({
              next: (data) => {
                this.cusInfo = data;
              },
              error: (err) => {
                this.errMessage = err;
              }
            });
          },
          error: (err) => {
            this.errMessage = err;
          }
        });
      },
      error: (err) => {
        this.errMessage = err;
      }
    });
  }
  goLoginPage() {
    this.router.navigate(['/login']);
  }
}
