import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-app';

  ngOnInit(): void {
    // Check if user is already logged in
    const user = sessionStorage.getItem('user');
    if (user) {
      console.log('User is already logged in:', user);
    } else {
      console.log('User is not logged in');
    }
  }

  onRegister(email: string, password: string): void {
    // Save user information to session storage
    sessionStorage.setItem('user', JSON.stringify({ email, password }));
    console.log('User registered successfully:', email);
  }

  onLogin(email: string, password: string): void {
    // Check if user information is correct
    const user = sessionStorage.getItem('user');
    if (user) {
      const { email: storedEmail, password: storedPassword } = JSON.parse(user);
      if (email === storedEmail && password === storedPassword) {
        console.log('User logged in successfully:', email);
      } else {
        console.log('Invalid email or password');
      }
    } else {
      console.log('User is not registered');
    }
  }
}
