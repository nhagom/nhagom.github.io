// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { SessionStorageService } from './services/session-storage.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private router: Router, private storageService: SessionStorageService) {}

//   canActivate(): boolean {
//     const user = this.storageService.getCurrentUser();
//     if (user) {
//       return true;
//     } else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }
// }
