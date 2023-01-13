import {Component, OnInit} from '@angular/core';
import {Product} from "../../shared/_model/product";
import {ProductService} from "../../shared/_services/product.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {fadeInUpOnEnterAnimation} from "angular-animations";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
  ,
  animations: [fadeInUpOnEnterAnimation({anchor: 'enter'})]
})
export class ProductsComponent implements OnInit {
  list: Product[] = [];
  displayedColumns: string[] = ['IMG', 'ID', 'NAME', 'STOCK', 'CATEGORYID', 'PRICE', 'DESCRIPTION', 'DESIGNER', 'EDIT'];
  searchText: any;
  dataSource: any;

  constructor(private productService: ProductService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe({
        next: response => {
          this.list = response.payload;
          this.dataSource = new MatTableDataSource(this.list);
        }
      })
  }

  edit(product: Product, reason: string) {
    const modalRef = this.modalService.open(ProductDetailComponent, {size: 'xl'});
    modalRef.componentInstance.reason = reason;
    if (reason === 'edit') {
      modalRef.componentInstance.product = product;
    } else {
      modalRef.componentInstance.product = null;
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
