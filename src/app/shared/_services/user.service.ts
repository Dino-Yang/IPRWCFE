import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../_model/user";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  putUser(user: User): Observable<any> {
    return this.http.put<any>(environment.apiUrl + '/api/users/', user);
  }

  saveUser(user: User): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/api/users/', user);
  }

  checkUsername(username: String): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/api/users/username/check', username)
  }

  getUser(username: String): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/api/users/' + username);
  }

  getAll(): Observable<any> {
    return this.http.get(environment.apiUrl + '/api/users/all/')
  }

  checkEmail(email: String): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/api/users/email/check', email)
  }
}
