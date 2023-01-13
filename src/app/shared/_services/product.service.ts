import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environment/environment";
import {Product} from "../_model/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/api/products/');
  }

  getProductsByEnabled(enabled: boolean): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/api/products/enabled/' + enabled);
  }

  getOneProduct(id: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/api/products/' + id);
  }

  getProductsByCartId(id: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/api/products/cartId/' + id);
  }

  putProduct(product: Product): Observable<any> {
    return this.http.put<any>(environment.apiUrl + '/api/products/', product);
  }
}
