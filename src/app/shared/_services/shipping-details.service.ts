import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environment/environment";
import {ShippingDetails} from "../_model/shipping-details";

@Injectable({
  providedIn: 'root'
})
export class ShippingDetailsService {

  constructor(private http: HttpClient) {
  }

  getShippingDetailsByOrderId(orderId: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/api/shipping/' + orderId);
  }

  saveShippingDetails(shippingDetails: ShippingDetails): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/api/shipping/', shippingDetails);
  }
}
