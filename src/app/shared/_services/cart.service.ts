import {Injectable} from '@angular/core';
import {Product} from "../_model/product";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment/environment";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Product[] = [];


  constructor(private http: HttpClient) {
  }

  addToCart(product: Product) {
    if (!this.items.some(item => item.name === product.name)) {
      this.items.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  checkDuplicate(product: Product) {
    return this.items.some(item => item.name === product.name);
  }

  removeItem(product: Product) {
    this.items.splice(this.items.findIndex(item => item.name === product.name), 1)
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  getItems() {
    let jsonCart = localStorage.getItem('cart');
    if (jsonCart) {
      this.items = JSON.parse(jsonCart);
    }
    return this.items;
  }

  getCartPrice() {
    let totalPrice = 0;
    for (let product of this.items) {
      totalPrice += product.price;
    }
    return totalPrice;
  }

  clearCart() {
    this.items = [];
    localStorage.setItem('cart', JSON.stringify(this.items));
    return this.items;
  }

  createEmptyCart(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + "/api/cart/create/empty");
  }

  updatePrice(totalPrice: number, cartId: number): Observable<any> {
    return this.http.post(environment.apiUrl + "/api/cart/updateCart/" + cartId, totalPrice);
  }

  getPrice(cartId: number): Observable<any> {
    return this.http.get(environment.apiUrl + "/api/cart/price/" + cartId);
  }
}
