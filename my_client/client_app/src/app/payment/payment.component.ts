import { Component } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { CartService } from '../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';

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
  phoneNumber = "";
  name = ""
  constructor(private activateRoute: ActivatedRoute, private router:Router, private service: PaymentService, private cartService: CartService){
    this.cartService.getCart().subscribe(
      (data => {
        this.cart = data.cart,
        this.totalPrice = data.totalPrice
        this.totalPayment = this.totalPrice + 30000
      })
    )
  }

}
