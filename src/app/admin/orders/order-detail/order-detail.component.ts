import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductService} from "../../../shared/_services/product.service";
import {Product} from "../../../shared/_model/product";
import {CartService} from "../../../shared/_services/cart.service";
import {ShippingDetails} from "../../../shared/_model/shipping-details";
import {ShippingDetailsService} from "../../../shared/_services/shipping-details.service";
import {popperGenerator} from "@popperjs/core";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']

})
export class OrderDetailComponent implements OnInit {
  @Input() order: any;
  products: Product[] = [];
  price: number = 0;
  shippingDetails: any;

  constructor(public activeModal: NgbActiveModal, private productService: ProductService, private cartService: CartService, private shippingDetailsService: ShippingDetailsService) {
  }

  ngOnInit(): void {
    this.productService.getProductsByCartId(this.order.cartId)
      .subscribe({
        next: response => {
          this.products = response.payload;
          this.shippingDetailsService.getShippingDetailsByOrderId(this.order.id)
            .subscribe({
              next: response => {
                this.shippingDetails = response.payload;
              }
            })
        }
      });
    this.cartService.getPrice(this.order.cartId).subscribe({
      next: response => {
        this.price = response.payload;
      }
    })
  }
}
