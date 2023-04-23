import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatDialogModule} from '@angular/material/dialog';


import { AppComponent } from './app.component';
import { AccountpageComponent } from './accountpage/accountpage.component';
import { LoginComponent } from './login-page/login/login.component';
import { RegisterComponent } from './register/register.component';
import { BlogComponent } from './blog/blog.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductAllComponent } from './product-all/product-all.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ForgotPassComponent } from './login-page/forgot-pass/forgot-pass.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ShopGridComponent } from './shop-grid/shop-grid.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FilterPipe } from './filter.pipe';
import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [
    AppComponent,
    AccountpageComponent,
    RegisterComponent,
    BlogComponent,
    ChatbotComponent,
    ProductDetailComponent,
    ProductAllComponent,
    LoginComponent,
    ForgotPassComponent,
    BlogDetailComponent,
    ShopGridComponent,
    AboutUsComponent,
    HeaderComponent,
    FooterComponent,
    FilterPipe,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    NgxPaginationModule,
    RouterModule,
    ReactiveFormsModule,
    CarouselModule,
    BrowserAnimationsModule,
    ScrollingModule,
    DragDropModule,
    Ng2SearchPipeModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
