import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environment/environment";
import {UserDetails} from "../_model/user-details";

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor(private http: HttpClient) {
  }

  saveUserDetails(userDetails: UserDetails): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/api/users/details', userDetails);
  }

  getUserDetailsByUserId(id: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/api/users/details/' + id);
  }

  getUserDetailsExist(id: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/api/users/details/exist/' + id);
  }
}
