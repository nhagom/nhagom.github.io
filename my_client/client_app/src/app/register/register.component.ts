import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from '../services/session-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string='';
  password: string='';
  error: string='';

  constructor(private router: Router, private storageService: SessionStorageService) {}

  register() {
    const users = this.storageService.getUsers();
    const user = users.find(u => u.email === this.email);
    if (user) {
      this.error = 'Email already registered';
    } else {
      const newUser = { email: this.email, password: this.password };
      this.storageService.addUser(newUser);
      this.router.navigate(['/login']);
    }
  }
}
