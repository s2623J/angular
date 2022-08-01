import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(credentials: User): Observable<object> {
    return this.http.post('http://localhost:8080/api/users', credentials)
      .pipe(
        mergeMap(() => this.login(credentials))
      )

  }

  login(credentials: User): Observable<object> {
    return this.http
      .post('http://localhost:8080/api/sessions', credentials)
      .pipe(
        map((res: any) => {
          localStorage.setItem('Authorization', res.token);
          return res;
        })
      );
  }
}
