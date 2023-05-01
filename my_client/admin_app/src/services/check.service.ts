import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckService {
  isLoggedIn = false;
  checkLogin(): boolean {
    return this.isLoggedIn;
  }
}
