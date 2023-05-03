import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  login() {
    // Xử lý đăng nhập và cập nhật trạng thái isLoggedIn khi đăng nhập thành công
    this.isLoggedIn.next(true);
  }
  logout() {
    // Cập nhật trạng thái đăng nhập khi đăng xuất
    this.isLoggedIn.next(false);
    }
}
