import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string='';
  password: string='';
  error: string='';

  constructor(private router: Router, private loginService: LoginService) {}

  register() {
    const users = this.loginService.getUsers();
    const user = users.find(u => u.email === this.email);
    if (user) {
      this.error = 'Email already registered';
    } else {
      const newUser = { email: this.email, password: this.password };
      this.loginService.addUser(newUser);
      this.router.navigate(['/login']);
    }
  }

}

