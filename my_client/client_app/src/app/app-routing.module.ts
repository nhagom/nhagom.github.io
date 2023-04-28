import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AccountpageComponent } from './accountpage/accountpage.component';
import { LoginComponent } from './login-page/login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductAllComponent } from './product-all/product-all.component';
import { BlogComponent } from './blog/blog.component';
import { ForgotPassComponent } from './login-page/forgot-pass/forgot-pass.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { ShopGridComponent } from './shop-grid/shop-grid.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PaymentComponent } from './payment/payment.component';

// import { AuthGuard } from './auth-guard';
const routes: Routes = [
  {path: 'account', component:AccountpageComponent},
  { path: 'payment', component: PaymentComponent },

  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'home', component: AccountpageComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotpassword', component: ForgotPassComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'product-all', component: ProductAllComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog-detail/:id', component: BlogDetailComponent },
  { path: 'blog-detail', component: BlogDetailComponent },
  { path: 'shop-grid', component: ShopGridComponent },
  { path: 'home', component:HomepageComponent},
  { path: 'payment', component: PaymentComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
