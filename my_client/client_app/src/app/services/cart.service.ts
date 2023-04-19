import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cart: any = {};
  cartUpdated: Subject<any> = new Subject<any>();

  constructor(private storageService: StorageService) {
    this.storageService.storageUpdated.subscribe(() => {
      this.refresh();
    });
  }

  private _cartLookUp(id: string): boolean {
    return this._cart.hasOwnProperty(id) ? true : false;
  }

  getCart(): any {
    this._cart = this.storageService.fetch();
    if (!this._cart) { this._cart = {}; }

    return this._cart;
  }

  addItem(product: any): void {
    if (this._cartLookUp(product.id)) {
      this.changeQuantity(product.id);
    } else {
      this._newItem(product);
    }

    this.save();
  }

  private _newItem(product: any): void {
    const quantityElement = document.getElementById("quantity") as HTMLInputElement;
    if (quantityElement !== null) {
      product.quantity = quantityElement.value;
      this._cart[product.id] = product;
    }
  }

  addItems(products: any[]): void {
    products.forEach((product) => {
      this.addItem(product);
    });
  }

  save(): void {
    this.storageService.save(this._cart);
    this.cartUpdated.next(this._cart);
  }

  remove(id: string): void {
    delete this._cart[id];
    this.save();
  }

  clear(): void {
    this._cart = {};
    this.storageService.remove();
    this.cartUpdated.next(this._cart);
  }

  persist() { }

  changeQuantity(id: string): void {
    const quantityElement = document.getElementById("quantity") as HTMLInputElement;
    if (quantityElement !== null && this._cart[id]) {
      this._cart[id].quantity = quantityElement.value;
    }
  }

  changeCartQuantity(id: string): void {
    const index = "cart-quantity-" + id;
    const quantityElement = document.getElementById(index) as HTMLInputElement;
    if (quantityElement !== null && this._cart[id]) {
      this._cart[id].quantity = quantityElement.value;
      this.save();
    }
  }

  refresh(): void {
    this.cartUpdated.next(this._cart);
  }
}
