import { Component } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { CartService } from '../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Order } from '../models/order';
import { data } from 'jquery';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  cart:any;
  totalPrice = 0;
  ship = 30000;
  totalPayment = 0;
  customerEmail = "";
  customer: any;
  order=new Order();
  message = "";
  showSuccess = false;
  showOverlay = false;
  constructor(public activateRoute: ActivatedRoute, public router:Router, private service: PaymentService, private cartService: CartService){
      //get cart
    this.cartService.getCart().subscribe(
      (data => {
        this.cart = data.cart,
        this.totalPrice = data.totalPrice
        this.totalPayment = this.totalPrice + 30000
      })
    )

    //get user login
    this.service.getUser().subscribe(
      (data => {
        this.customerEmail = data.User
      })
    )

    //get thông tin customer
    this.service.getCustomerInfo(this.customerEmail).subscribe(
      (data => {
        this.order.customerName = data.customerName,
        this.order.customerPhoneNumb = data.customerPhoneNumb,
        this.order.customerAddress = data.customerAddress
      })
    )
    this.order.orderItems = this.cart,
    this.order.customerEmail = this.customerEmail,
    this.order.totalPrice = this.totalPayment
  }

  postOrder() {
    this.service.postOrder(this.order).subscribe(
      (data => this.message=data)
    )
    this.cartService.deleteCart();
    this.showSuccess = true;
    this.showOverlay = true;
  }

  ngOnInit() {
    setTimeout(() => {
      this.showSuccess = false;
      this.showOverlay = false;
      this.router.navigate(['/']);
    }, 5000);
  }

}
