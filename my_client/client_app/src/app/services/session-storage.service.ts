import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  private readonly usersKey = 'users';
  private readonly currentUserKey = 'currentUser';

  constructor() {}
  // lấy danh sách user đã lưu trữ
  getUsers(): IUser[] {
  const usersString = sessionStorage.getItem(this.usersKey);
  return usersString ? JSON.parse(usersString) : [];
  }
  // thêm mới user
  addUser(user: IUser) {
  const users = this.getUsers();
  users.push(user);
  sessionStorage.setItem(this.usersKey, JSON.stringify(users));
  }
  // lấy người dùng hiện tại
  getCurrentUser(): IUser {
  const userString = sessionStorage.getItem(this.currentUserKey);
  return userString ? JSON.parse(userString) : null;
  }
  // lưu user hiện tại
  setCurrentUser(user: IUser) {
  sessionStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }
  // xóa user hiện tại
  removeCurrentUser() {
  sessionStorage.removeItem(this.currentUserKey);
  }
  }


