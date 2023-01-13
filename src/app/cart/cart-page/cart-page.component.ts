import {Component, OnInit} from '@angular/core';
import {fadeInUpOnEnterAnimation, fadeOutLeftOnLeaveAnimation} from "angular-animations";
import {Product} from "../../shared/_model/product";
import {CartService} from "../../shared/_services/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
  animations: [fadeInUpOnEnterAnimation({anchor: 'enter'}), fadeOutLeftOnLeaveAnimation({
    anchor: 'leave'
  })]
})
export class CartPageComponent implements OnInit {
  products: Product[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService, private router: Router) {
  }

  ngOnInit(): void {
    this.products = this.cartService.getItems();
    if (this.products.length === 0) {
      this.router.navigate(['/collections'])
    }
    this.totalPrice = this.cartService.getCartPrice();
  }


  delete(product: Product) {
    this.cartService.removeItem(product);
    this.totalPrice = this.cartService.getCartPrice();
    if (this.products.length === 0) {
      this.router.navigate(['/collections'])
    }
  }

  goTo() {

  }
}
