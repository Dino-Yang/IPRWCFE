import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environment/environment";
import {CartItem} from "../_model/cart-item";

@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  constructor(private http: HttpClient) {
  }

  saveCartItem(cartItem: CartItem, cartId: number): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/api/cart/item/' + cartId, cartItem);
  }
}
