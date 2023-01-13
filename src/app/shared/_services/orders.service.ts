import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environment/environment";
import {Orders} from "../_model/orders";


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) {
  }

  postOrder(order: Orders): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/api/orders/', order);
  }

  getAllOrdersByUserId(userId: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/api/orders/userId/' + userId)
  }

  getAllOrders(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/api/orders/')
  }
}
