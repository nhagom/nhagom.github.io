import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private readonly usersKey = 'users';
  private readonly currentUserKey = 'currentUser';

  constructor() {}

  getUsers(): User[] {
  const usersString = sessionStorage.getItem(this.usersKey);
  return usersString ? JSON.parse(usersString) : [];
  }

  addUser(user: User) {
  const users = this.getUsers();
  users.push(user);
  sessionStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  getCurrentUser(): User {
  const userString = sessionStorage.getItem(this.currentUserKey);
  return userString ? JSON.parse(userString) : null;
  }

  setCurrentUser(user: User) {
  sessionStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  removeCurrentUser() {
  sessionStorage.removeItem(this.currentUserKey);
  }
  }

  interface User {
  email: string;
  password: string;
  }
