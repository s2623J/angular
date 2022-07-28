import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signup', () => {
    it('should return a user object with a valid username and password', () => {

      const user = {
        'username': 'myUser',
        'password': 'password'
      };

      const signupResponse = {
        "__v": 0,
        "username": "myUser",
        "password": "$2a$10$wiFaBrcTai6w4n5BqYt2MufVurq5tTz5U3B3YnlqkEs.SdfvedIBe",
        "_id": "62e2b4785b3e871e80bb5316",
        "dietPreferences": []
      }
      
      let response!: object;

      service.signup(user).subscribe((res) => {
        response = res;
      })

      http.expectOne('http://localhost:8080/api/users').flush(signupResponse);
      expect(response).toEqual(signupResponse);
      http.verify();
    })
  })
});

