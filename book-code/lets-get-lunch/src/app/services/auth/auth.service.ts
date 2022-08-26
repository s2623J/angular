import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { User } from './user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean>;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.loggedIn = new EventEmitter();
  }

  signup(credentials: User): Observable<object> {
    return this.http
      .post('http://localhost:8080/api/users', credentials)
      .pipe(mergeMap(() => this.login(credentials)));
  }

  login(credentials: User): Observable<object> {
    return this.http
      .post('http://localhost:8080/api/sessions', credentials)
      .pipe(
        map((res: any) => {
          localStorage.setItem('Authorization', res.token);
          this.loggedIn.emit(true);
          return res;
        })
      );
  }

  isLoggedIn(): boolean {
    return !this.jwtHelper.isTokenExpired();
  }

  logout() {
    localStorage.removeItem('Authorization');
    this.loggedIn.emit(false);
  }

  currentUser() {
    let token = localStorage.getItem('Authorization');
    return (token == null) ? undefined : this.jwtHelper.decodeToken(token);
  }
}
