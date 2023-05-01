import { Component } from '@angular/core';
import { AdminService } from 'src/services/admin.service';
import { Router } from '@angular/router';
import { IUser } from 'src/models/login';
import { CheckService } from 'src/services/check.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  aUser = new IUser()
  constructor(private adminService: AdminService, private router: Router, private checkService:CheckService) {}
  onSubmit(aUser: any): boolean {
    let check = false;
    this.adminService.getAdmin(aUser).subscribe({
      next: (data) => {
        check = data;
        if (check) {
          this.adminService.login()
        } else {
          // Sử dụng một loại thông báo khác để hiển thị cho người dùng.
          alert("Tên đăng nhập hoặc mật khẩu không đúng, vui lòng kiểm tra lại!");
        }
      }
    });
    return check;
  }
  ngOnInit() {
    if (this.checkService.checkLogin()) {
      this.router.navigate(['home']);
    }
  }
}
