import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from '../services/session-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string ='';
  password: string ='';
  error: string ='';

  constructor(private router: Router, private storageService: SessionStorageService) {}

  login() {
    const users = this.storageService.getUsers();
    const user = users.find(u => u.email === this.email && u.password === this.password);
    if (user) {
      this.storageService.setCurrentUser(user);
      this.router.navigate(['/home']);
    } else {
      this.error = 'Invalid email or password';
    }
  }
}

