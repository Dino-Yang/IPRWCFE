import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, Subject} from "rxjs";
import {JwtToken} from "../_model/jwt-token";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject: BehaviorSubject<JwtToken | null>;
  public getLoggedIn = new Subject();
  public token: Observable<JwtToken | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.tokenSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('JwtToken')!));
    this.token = this.tokenSubject.asObservable();
  }

  public get tokenValue() {
    return this.tokenSubject;
  }

  login(username: string, password: string) {
    let options = {
      headers: new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded',
        }
      )
    };
    let body = new URLSearchParams();

    body.set('username', username);
    body.set('password', password);

    return this.http.post<any>(environment.apiUrl + '/api/login', body, options)
      .pipe(map(token => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('JwtToken', JSON.stringify(token));
        this.tokenSubject.next(token);
        this.getLoggedIn.next("Logged");
        return token;
      }));
  }

  logout() {
    localStorage.removeItem('JwtToken');
    this.getLoggedIn.next("LoggedOut");
    this.tokenSubject.next(null);
  }

  getLoggedInUserId() {
    let jwt = localStorage.getItem('JwtToken')
    if (jwt) {
      let jwtData = jwt.split('.')[1]
      let decodedJwtJsonData = window.atob(jwtData)
      let decodedJwtData = JSON.parse(decodedJwtJsonData)
      return decodedJwtData.userId;
    }
  }

  isAdmin() {
    let jwt = localStorage.getItem('JwtToken')
    if (jwt) {
      let jwtData = jwt.split('.')[1]
      let decodedJwtJsonData = window.atob(jwtData)
      let decodedJwtData = JSON.parse(decodedJwtJsonData)
      let roles = decodedJwtData.roles;
      if (roles.includes('ROLE_ADMIN')) {
        return true;
      } else {
        return false
      }
    }
    return false;
  }

  loggedIn() {
    if (localStorage.getItem('JwtToken') !== null) {
      return true;
    } else {
      return false;
    }
  }
}
