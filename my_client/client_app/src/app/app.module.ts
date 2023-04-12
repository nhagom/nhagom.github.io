import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';


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
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule} from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ForgotPassComponent } from './login-page/forgot-pass/forgot-pass.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';


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
    BlogDetailComponent
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
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    NzPaginationModule,
    NzLayoutModule,
    ScrollingModule,
    DragDropModule,
    NzBreadCrumbModule,
    NzDropDownModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
