import { Component } from '@angular/core';
import { AdminService } from 'src/services/admin.service';
import { Router } from '@angular/router';
import { IUser } from 'src/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  aUser = new IUser()
  check = false
  constructor(private adminService: AdminService, private router: Router) {}
  onSubmit(aUser:any): void {

    this.adminService.getAdmin(aUser).subscribe({
      next:(data) => {this.check = data}
    })
    if (this.check == true) {
      this.router.navigate(['customer']);
    }
    else {alert("Tên đăng nhập hoặc mật khẩu không đúng, vui lòng kiểm tra lại!");}
  }
}
