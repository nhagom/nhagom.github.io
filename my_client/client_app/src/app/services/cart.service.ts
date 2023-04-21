import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: any[] = [];
  constructor() {
    // Lấy dữ liệu giỏ hàng từ local storage (nếu có)
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cart = JSON.parse(cartData);
    }
  }

  totalPrice = 0;
  totalQuan = 0;

  private cartSubject = new BehaviorSubject<any>({
    cart: this.cart,
    totalPrice: this.totalPrice,
    totalQuantity: this.totalQuan
  });

  getCart(): Observable<any> {
    return this.cartSubject.asObservable();
  }


  addToCart(product: any, quantity: number ) {
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const index = this.cart.findIndex(item => item.productId === product.productId);

    if (index === -1) {
      // Nếu chưa có thì thêm sản phẩm mới vào giỏ hàng
      this.cart.push({
        ...product,
        quantity
      });
    } else {
      // Nếu đã có thì tăng số lượng sản phẩm lên
      this.cart[index].quantity += quantity;
    }

    // Lưu dữ liệu giỏ hàng vào local storage
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.totalPrice = this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    this.totalQuan = this.cart.reduce((total, item) => total + item.quantity, 0);
    // Phát ra giá trị mới của cart, totalPrice và totalQuantity đến tất cả các subscriber
    this.cartSubject.next({
      cart: this.cart,
      totalPrice: this.totalPrice,
      totalQuantity: this.totalQuan
    });
  }

  removeFromCart(productId: any) {
    // Xóa sản phẩm khỏi giỏ hàng
    const index = this.cart.findIndex(item => item.productId === productId);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }

    // Lưu dữ liệu giỏ hàng vào local storage
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.totalPrice = this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    this.totalQuan = this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  changeCartQuan(productId: any, quantity: number) {
    // Thay đổi số lượng sản phẩm trong giỏ hàng
    const index = this.cart.findIndex(item => item.productId === productId);
    if (index !== -1) {
      this.cart[index].quantity = quantity;
    }

    // Lưu dữ liệu giỏ hàng vào local storage
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.totalPrice = this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    this.totalQuan = this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice() {
    // Tính tổng tiền của giỏ hàng
    return this.totalPrice
  }

  getTotalQuantity() {
    // Tính tổng số lượng sản phẩm trong giỏ hàng
    return this.totalQuan
  }

}
