import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string ='';
  password: string ='';
  error: string ='';

  constructor(private router: Router, private loginService: LoginService) {}

  login() {
    const users = this.loginService.getUsers();
    const user = users.find(u => u.email === this.email && u.password === this.password);
    if (user) {
      this.loginService.setCurrentUser(user);
      this.router.navigate(['/home']);
    } else {
      this.error = 'Invalid email or password';
    }
  }
}

