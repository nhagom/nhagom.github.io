import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';



import { AppComponent } from './app.component';
import { AccountpageComponent } from './accountpage/accountpage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BlogComponent } from './blog/blog.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductAllComponent } from './product-all/product-all.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    AppComponent,
    AccountpageComponent,
    LoginComponent,
    RegisterComponent,
    BlogComponent,
    ChatbotComponent,
    ProductDetailComponent,
    ProductAllComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CarouselModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
