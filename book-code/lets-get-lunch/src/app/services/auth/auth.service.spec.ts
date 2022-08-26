import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { tokenGetter } from 'src/app/app.module';
import { } from 'jasmine'; // Removes type conflicts with unit tests

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;
  let jwtHelper: JwtHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter
          }
        })
      ],
      providers: [
        AuthService,
        JwtHelperService
      ]
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
    jwtHelper = TestBed.inject(JwtHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signup', () => {
    it('should return a token with a valid username and password', () => {
      const user = {
        username: 'myUser',
        password: 'password',
      };

      const signupResponse = {
        __v: 0,
        username: 'myUser',
        password:
          '$2a$10$fHc1lJoPVNDD3Vas2/eE5.3VBm2/t0Fgww.dn9t8N0d7cwda9Nm3u',
        _id: '62e7164f3cb68c1af828c5c0',
        dietPreferences: [],
      };

      const loginResponse = { token: 's3cr3ttOken' };
      let response!: object;

      service.signup(user).subscribe((res) => {
        response = res;
      });
      spyOn(service, 'login').and.callFake(() => of(loginResponse));

      http.expectOne('http://localhost:8080/api/users').flush(signupResponse);

      expect(response).toEqual(loginResponse);
      expect(service.login).toHaveBeenCalled();
      http.verify();
    });

    it('should return an error for an invalid user object', () => {
      const user = {
        username: 'myUser',
        password: 'pswd',
      };

      const signupResponse =
        'Your password must be at least 5 characters long.';
      let errorResponse: any;

      service.signup(user).subscribe(
        (res) => {},
        (err) => {
          errorResponse = err;
        }
      );

      http // Configure a request with mocked inputs
        .expectOne('http://localhost:8080/api/users')
        .flush(
          { message: signupResponse },
          { status: 400, statusText: 'Bad Request' }
        );

      expect(errorResponse.error.message).toEqual(signupResponse);
      http.verify();
    });
  });

  it('should return a user object with a valid username and password', () => {
    const user = {
      username: 'myUser',
      password: 'password',
    };

    const signupResponse = {
      __v: 0,
      username: 'myUser',
      password: '$2a$10$wiFaBrcTai6w4n5BqYt2MufVurq5tTz5U3B3YnlqkEs.SdfvedIBe',
      _id: '62e2b4785b3e871e80bb5316',
      dietPreferences: [],
    };

    const loginResponse = { token: 's3cr3ttOken' };
    let response!: object;

    service.signup(user).subscribe((res) => {
      response = res;
    });

    // Spying on 'login' method, replacing response to validate
    // that it returns something at all
    spyOn(service, 'login').and.callFake(() => of(loginResponse));

    // Similar to Postman, using an "http" service to send a request,
    // from which a mocked "signupResponse" is returned to the
    // client service
    http.expectOne('http://localhost:8080/api/users').flush(signupResponse);

    expect(response).toEqual(loginResponse);
    http.verify();
  });

  describe('login', () => {
    it('should return a token with a valid username and password', () => {
      const user = {
        username: 'myUser',
        password: 'password',
      };

      const loginResponse = { token: 's3cr3ttOken' };
      let response: any;

      // Using "client" service to send mocked "user" data, and setting a
      // "response" variable
      service.login(user).subscribe((res) => {
        response = res;
      });

      spyOn(service.loggedIn, 'emit');

      // Similar to Postman, using an "http" service to return a mocked
      // "loginResponse"
      http.expectOne('http://localhost:8080/api/sessions').flush(loginResponse);

      expect(response).toEqual(loginResponse);
      expect(localStorage.getItem('Authorization')).toEqual('s3cr3ttOken');
      expect(service.loggedIn.emit).toHaveBeenCalled();
      http.verify();
    });
  });

  describe('isLoggedIn', () => {
    it('should return true if the user is logged in', () => {
      localStorage.setItem('Authorization', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTIxNzY4NTY3MzV9.2LxoVtRmowCeUiXUS0bMkMt5pT-FTB3VY3DSmUXwH7Y");
      expect(service.isLoggedIn()).toEqual(true);
    })

    it('should return false if the user is NOT logged in', () => {
      localStorage.removeItem('Authorization');
      expect(service.isLoggedIn()).toEqual(false);
    })
  });

  describe('logout', () => {
    it('should clear the token from local storage', () => {
      spyOn(service.loggedIn, 'emit');
      localStorage.setItem('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTIxNzY4NTY3MzV9.2LxoVtRmowCeUiXUS0bMkMt5pT-FTB3VY3DSmUXwH7Y');
      expect(localStorage.getItem('Authorization')).toEqual('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTIxNzY4NTY3MzV9.2LxoVtRmowCeUiXUS0bMkMt5pT-FTB3VY3DSmUXwH7Y');
      service.logout();
      expect(localStorage.getItem('Authorization')).toBeFalsy();
      expect(service.loggedIn.emit).toHaveBeenCalledOnceWith(false);
    })
  })

  describe('currentUser', () => {
    it('should return a user object with a valid token', () => {
      spyOn(localStorage, 'getItem').and.callFake(() => {
        return 'fakeToken';
      });
      spyOn(jwtHelper, 'decodeToken').and.returnValue({
        exp: 1517847480,
        iat: 1517840280,
        username: 'username',
        _id: '5a6f41c94000495518d2673f'
      });
      const res = service.currentUser();

      expect(localStorage.getItem).toHaveBeenCalled();
      expect(res.username).toBeDefined();
      expect(res._id).toBeDefined();
    })
  })
});
