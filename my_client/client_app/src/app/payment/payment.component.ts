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
  customerEmail:string = "";
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
    const email = localStorage.getItem('customerEmail')
    if (email) {
      this.customerEmail = email
    }

    //get thông tin customer
    this.service.getCustomerInfo(email).subscribe(
       (data => {
        this.order.customerName = data.customerName,
        this.order.customerPhoneNumb = data.customerPhoneNumb,
        this.order.customerAddress = data.customerAddress
      })
    )
    this.order.orderItems = this.cart,
    this.order.customerEmail = this.customerEmail,
    this.order.totalPrice = this.totalPayment
    console.log(this.order)
  }

  postOrder() {
    this.service.postOrder(this.order).subscribe(
      (data => this.message=data)
    )
    this.cartService.deleteCart();
    this.showSuccess = true;
    this.showOverlay = true;
    this.submit()
  }

  submit() {
    setTimeout(() => {
      this.showSuccess = false;
      this.showOverlay = false;
      this.router.navigate(['/']);
    }, 4000);
  }

  showBankingPopup = false;
  countdown = 180;
  selectedPaymentMethod = ""

  confirmPayment() {
    // Kiểm tra phương thức thanh toán
    if (this.selectedPaymentMethod == "COD") {
      this.postOrder()
    }
    else {
      this.openBankingPopup()
    }
  }

  openBankingPopup() {
    this.showBankingPopup = true;
    const intervalId = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(intervalId);
        this.closeBankingPopup();
      }
    }, 1000);
  }

  closeBankingPopup() {
    this.showBankingPopup = false;
    this.countdown = 180;
    this.router.navigate(['/']);
  }

  closeBankingPopup2() {
    this.showBankingPopup = false;
    this.countdown = 180;
    this.postOrder();
  }

}
