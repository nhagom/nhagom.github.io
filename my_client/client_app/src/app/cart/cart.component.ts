import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import * as bootstrap from "bootstrap";
import * as $ from "jquery";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  // cart: any = {};

  // constructor(private cartService: CartService) { }

  // ngOnInit(): void {
  //   this.cart = this.cartService.getCart();
  //   this.cartService.cartUpdated.subscribe((cart: any) => {
  //     this.cart = cart;
  //   });
  // }

  // changeCartQuan(index: string): void {
  //   this.cartService.changeCartQuantity(index);
  // }

  // removeProduct(index: string): void {
  //   this.cartService.remove(index);
  // }

  // totalPrice(): number {
  //   let total = 0;
  //   this.cart = this.cartService.getCart();
  //   Object.values(this.cart).forEach((e: any) => {
  //     total += parseInt(e.quantity) * parseInt(e.gia);
  //   });
  //   return total;
  // }

  // totalQuantity(): number {
  //   let total = 0;
  //   this.cart = this.cartService.getCart();
  //   Object.values(this.cart).forEach((e: any) => {
  //     total += parseInt(e.quantity);
  //   });
  //   return total;
  // }

  // closeModal(): void {
  //   $("#exampleModal").modal('hide');
  // }
}
