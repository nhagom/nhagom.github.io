// lưu trữ thông tin người dùng
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  private readonly usersKey = 'users';
  private readonly currentUserKey = 'currentUser';

  constructor() {}

  getUsers(): IUser[] {
  const usersString = sessionStorage.getItem(this.usersKey);
  return usersString ? JSON.parse(usersString) : [];
  }

  addUser(user: IUser) {
  const users = this.getUsers();
  users.push(user);
  sessionStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  getCurrentUser(): IUser {
  const userString = sessionStorage.getItem(this.currentUserKey);
  return userString ? JSON.parse(userString) : null;
  }

  setCurrentUser(user: IUser) {
  sessionStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  removeCurrentUser() {
  sessionStorage.removeItem(this.currentUserKey);
  }
  }


