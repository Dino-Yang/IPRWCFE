import {Component, Input, OnInit} from '@angular/core';
import {Orders} from "../../../shared/_model/orders";
import {Product} from "../../../shared/_model/product";
import {ProductService} from "../../../shared/_services/product.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OrderDetailComponent} from "../../../admin/orders/order-detail/order-detail.component";

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss']
})
export class HistoryItemComponent implements OnInit {
  @Input() order: any;
  productList: Product[] = [];

  constructor(private productService: ProductService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.productService.getProductsByCartId(this.order.cartId)
      .subscribe({
        next: response => {
          this.productList = response.payload;
        }
      });
  }

  openDetails() {
    const modalRef = this.modalService.open(OrderDetailComponent, {size: "xl"});
    modalRef.componentInstance.order = this.order;
  }
}
