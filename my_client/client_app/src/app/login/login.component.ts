import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Customers } from '../models/customers';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  customer =new Customers();
  errMessage:string=''

  logForm: any;
  errFlag: boolean = false;
  constructor(private formBuilder: FormBuilder, private _service: LoginService, private router: Router, private route: ActivatedRoute){}

  ngOnInit() {
    this.logForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  get email(){
    return this.logForm.controls['email']
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }


}

