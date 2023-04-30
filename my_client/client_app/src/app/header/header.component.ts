import { Component } from '@angular/core';
import { LoginComponent } from '../login-page/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../services/cart.service';
import * as $ from "jquery";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public searchTerm !: string;
  cart: any[] = [];
  totalPrice: number = 0
  totalQuantity: number = 0;
  customerName: string = "";
  isLogin = false;
  notLogin = true;
  constructor(public dialog: MatDialog, public router: Router, private service: CartService ,private _http: HttpClient, private sv2: PaymentService) {
    let _email
    this.sv2.getUser().subscribe({
      next:(data) => _email = data
    })
    if (_email) {
      this.isLogin = true;
      this.notLogin = false
    }

    this.service.getCart().subscribe(
      (data) => {
      this.cart = data.cart;
      this.totalPrice = data.totalPrice;
      this.totalQuantity = data.totalQuantity;
      this.isCartEmpty = this.cart.length === 0;
      }
    )



   }

  openDialog() {
    this.dialog.open(LoginComponent, {
      // width:'60%'
    });
  }


/////cart
  isCartEmpty: boolean = true;
  removeProduct(productId: number) {
    // Xóa sản phẩm khỏi giỏ hàng
    this.service.removeFromCart(productId);
    this.cart = this.service.cart;
    this.totalPrice = this.service.getTotalPrice();
    this.totalQuantity = this.service.getTotalQuantity();
  }

  changeQuan(productId: any, quantity: number){
    // Thay đổi số lượng sản phẩm trong giỏ hàng
    this.service.changeCartQuan(productId, quantity);
    // Cập nhật giỏ hàng và tổng giá tiền
    this.cart = this.service.cart;
    this.totalPrice = this.service.getTotalPrice();
    this.totalQuantity = this.service.getTotalQuantity();
  }

  closeModal(): void {
    $("#exampleModal").modal('hide');
  }

  showModal(): void {
    $("#exampleModal").modal('show');
  }

  payment() {
    const user = localStorage.getItem('customerEmail');
    if (user) {
      this.router.navigate(['payment']);
    }
    else {
      this.router.navigate(['login']);
    }
  }

}
