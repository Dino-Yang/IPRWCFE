import {Component, OnInit} from '@angular/core';
import {Product} from "../../shared/_model/product";
import {OrdersService} from "../../shared/_services/orders.service";
import {AuthService} from "../../shared/_services/auth.service";
import {Orders} from "../../shared/_model/orders";
import {fadeInUpOnEnterAnimation} from "angular-animations";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  animations: [fadeInUpOnEnterAnimation({anchor: 'enter'})]
})
export class HistoryComponent implements OnInit {
  historyList: Orders[] = [];

  constructor(private ordersSerivce: OrdersService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.ordersSerivce.getAllOrdersByUserId(this.authService.getLoggedInUserId())
      .subscribe({
        next: response => {
          this.historyList = response.payload;
          // @ts-ignore
          this.historyList = this.historyList.sort((a, b) => a.date < b.date ? 1 : -1)
        }
      })
  }

}
