import {Component, OnInit} from '@angular/core';
import {Product} from "../shared/_model/product";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../shared/_services/product.service";
import {fadeInUpOnEnterAnimation, fadeOutDownOnLeaveAnimation} from "angular-animations";
import {CartService} from "../shared/_services/cart.service";
import {ToastService} from "../shared/_services/toast.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: [fadeInUpOnEnterAnimation({anchor: 'enter'}), fadeOutDownOnLeaveAnimation({anchor: 'leave'})]
})
export class DetailComponent implements OnInit {
  product: Product | undefined;

  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService, private toastService: ToastService) {
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));
    this.productService.getOneProduct(productIdFromRoute).subscribe(product => {
      this.product = product.payload;
    })
  }

  addToCart(product: Product) {
    if (!this.cartService.checkDuplicate(product)) {
      this.toastService.show("", product.name + " put in Cart");
      this.cartService.addToCart(product);
    } else {
      this.toastService.show("", product.name + " is already in Cart");
    }

  }
}
