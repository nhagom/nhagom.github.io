import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Customers } from 'src/app/models/customers';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  customer =new Customers();
  errMessage:string=''
  logForm: any;

  constructor(private formBuilder: FormBuilder, private _service: LoginService, private router: Router, private route: ActivatedRoute, private _http:HttpClientModule){}
  // validator
  ngOnInit() {
    this.logForm = this.formBuilder.group({
      email: ['', [Validators.required]],
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
  //dsd


}

