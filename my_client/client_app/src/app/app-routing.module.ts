import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { AccountpageComponent } from './accountpage/accountpage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
// import { AuthGuard } from './auth-guard';
const routes: Routes = [
  {path: 'account', component:AccountpageComponent},

  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'home', component: AccountpageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
