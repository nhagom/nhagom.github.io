import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AccountpageComponent } from './accountpage/accountpage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductAllComponent } from './product-all/product-all.component';
import { BlogComponent } from './blog/blog.component';
// import { AuthGuard } from './auth-guard';
const routes: Routes = [
  {path: 'account', component:AccountpageComponent},

  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'home', component: AccountpageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'product-all', component: ProductAllComponent },
  { path: 'blog', component: BlogComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
