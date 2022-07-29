import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(credentials: User): Observable<object> {
    return this.http.post('http://localhost:8080/api/users', credentials);
  }

  login(credentials: User): Observable<object> {
    return this.http
      .post('http://localhost:8080/api/sessions', credentials)
      .pipe(
        map((res: any) => {
          console.log('res: ', JSON.stringify(res));
          localStorage.setItem('Authorization', res.token);
          return res;
        })
      );
  }
}
