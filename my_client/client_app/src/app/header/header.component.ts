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
  public searchTerm !: string;
  cart: any[] = [];
  totalPrice: number = 0
  totalQuantity: number = 0;
  constructor(public dialog: MatDialog, private service: CartService ) {
    this.service.getCart().subscribe(
      (data) => {
      this.cart = data.cart;
      this.totalPrice = data.totalPrice;
      this.totalQuantity = data.totalQuantity
      }
    )
   }

  openDialog() {
    this.dialog.open(LoginComponent, {
      // width:'60%'
    });
  }

//cart

  // ngOnInit() {
  //   // Lấy dữ liệu giỏ hàng từ service
  //   this.service.getCart().subscribe((data) =>
  //   {
  //     this.cart = data.cart;
  //     this.totalPrice = data.totalPrice;
  //     this.totalQuantity = data.totalQuantity
  //   })
  // }

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


}
