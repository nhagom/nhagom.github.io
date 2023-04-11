import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Customers } from 'src/app/models/customers';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { passwordValidator } from 'src/app/check.validator';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent {
  customer =new Customers();
  errMessage:string=''
  logForm: any;
  errFlag: boolean = false;

  constructor(private formBuilder: FormBuilder, private _service: LoginService, private router: Router, private route: ActivatedRoute, private _http:HttpClientModule){

  }
  // validator
  ngOnInit() {
    this.logForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPass: ['', [Validators.required]]
    }, { validators: passwordValidator });
  }
  putPassword(){
    this._service.putPassword(this.customer).subscribe({
      next:(data)=>{this.customer=data},
      error:(err)=>{this.errMessage=err}
    })
  }



}
