import {Component, OnInit} from '@angular/core';
import {Orders} from "../../shared/_model/orders";
import {OrdersService} from "../../shared/_services/orders.service";
import {fadeInUpOnEnterAnimation} from "angular-animations";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {OrderDetailComponent} from "./order-detail/order-detail.component";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [fadeInUpOnEnterAnimation({anchor: 'enter'})]
})
export class OrdersComponent implements OnInit {
  list: Orders[] = [];
  displayedColumns: string[] = ['ID', 'USER_ID', 'DATE', 'DETAILS'];
  searchText: any;
  dataSource: any;

  constructor(private ordersService: OrdersService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.ordersService.getAllOrders().subscribe({
      next: response => {
        this.list = response.payload;
        this.dataSource = new MatTableDataSource(this.list);
      }
    })
  }

  seeDetails(order: Orders) {
    const modalRef = this.modalService.open(OrderDetailComponent, {size: 'xl'});
    modalRef.componentInstance.order = order;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
