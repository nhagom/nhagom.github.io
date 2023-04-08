import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from '../services/session-storage.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  customerEmail = '';
  password = '';
  errorMessage = '';

  constructor(private loginService: LoginService) { }

  onSubmit() {
    this.loginService.postLogin(this.customerEmail, this.password).subscribe(
      (response: any) => {
        // Nếu đăng nhập thành công, chuyển hướng tới trang chủ
        window.location.href = '/home';
      },
      (error) => {
        // Nếu đăng nhập không thành công, hiển thị thông báo lỗi
        this.errorMessage = 'Email hoặc password không chính xác';
      }
    );
  }
  // email: string ='';
  // password: string ='';
  // error: string ='';

  // constructor(private router: Router, private storageService: SessionStorageService) {}

  // login() {
  //   const users = this.storageService.getUsers();
  //   const user = users.find(u => u.email === this.email && u.password === this.password);
  //   if (user) {
  //     this.storageService.setCurrentUser(user);
  //     this.router.navigate(['/home']);
  //   } else {
  //     this.error = 'Invalid email or password';
  //   }
  // }

}

