import { Component } from '@angular/core';
import { LoginComponent } from '../login-page/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../services/cart.service';
import * as bootstrap from "bootstrap";
import * as $ from "jquery";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public totalItem:number = 0;
  public searchTerm !: string;
  constructor(public dialog: MatDialog, private cartService: CartService) { }

  openDialog() {
    this.dialog.open(LoginComponent, {
      // width:'60%'
    });
  }

  //cart
  cart: any = {};
  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.cartService.cartUpdated.subscribe((cart: any) => {
      this.cart = cart;
    });

    $('#exampleModal').modal({
  backdrop: false,
  keyboard: false
});

  }
  totalQuantity(): number {
    let total = 0;
    this.cart = this.cartService.getCart();
    Object.values(this.cart).forEach((e: any) => {
      total += parseInt(e.quantity);
    });
    return total;
  }

  changeCartQuan(index: string): void {
    this.cartService.changeCartQuantity(index);
  }

  removeProduct(index: string): void {
    this.cartService.remove(index);
  }

  totalPrice(): number {
    let total = 0;
    this.cart = this.cartService.getCart();
    Object.values(this.cart).forEach((e: any) => {
      total += parseInt(e.quantity) * parseInt(e.gia);
    });
    return total;
  }


  closeModal(): void {
    $("#exampleModal").modal('hide');
  }

  showModal(): void {
    $("#exampleModal").modal('show');
  }


}
