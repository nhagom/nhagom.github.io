import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { BlogsComponent } from './blogs/blogs.component';
import { SortBlogsPipe} from './blogs/sort-blogs.pipe';
import { SortOrdersPipe} from './orders/sort-orders.pipe';
import { ShipOrdersPipe} from './orders/ship-orders.pipe';
import { SortProductsPipe } from './products/sort-products.pipe';
import { sortPricePipe } from './products/sort-price.pipe';
import { SortCustomersPipe } from './customers/sort-customers.pipe';



@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    LoginComponent,
    OrdersComponent,
    ProductsComponent,
    HomeComponent,
    SortProductsPipe,
    SortBlogsPipe,
    SortCustomersPipe,
    SortOrdersPipe,
    sortPricePipe,
    ShipOrdersPipe,
    BlogsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,

  ],
  bootstrap: [AppComponent],
  providers: [ ]
})
export class AppModule { }
