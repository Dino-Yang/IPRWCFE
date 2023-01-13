import {Component, OnInit} from '@angular/core';
import {NgbActiveOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {CartService} from "../shared/_services/cart.service";
import {Product} from "../shared/_model/product";
import {fadeInUpOnEnterAnimation, fadeOutRightOnLeaveAnimation} from "angular-animations";
import {AuthService} from "../shared/_services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [fadeInUpOnEnterAnimation({
    anchor: 'enter',
    duration: 1000, delay: 100
  }), fadeOutRightOnLeaveAnimation({anchor: 'leave', duration: 500})]
})
export class CartComponent implements OnInit {
  items = this.cartService.getItems();

  constructor(public activeOffcanvas: NgbActiveOffcanvas, private cartService: CartService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.items = this.cartService.getItems();
  }

  clearCart() {
    this.cartService.clearCart();
    this.items = [];
  }


  removeItem(item: Product) {
    this.cartService.removeItem(item);
  }

  goToCart() {
    this.activeOffcanvas.dismiss();
    if (this.authService.loggedIn()) {
      this.router.navigate(['/cart']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
