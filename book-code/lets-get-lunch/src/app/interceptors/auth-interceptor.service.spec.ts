import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthInterceptorService } from './auth-interceptor.service';

describe('AuthInterceptorService', () => {
  let http: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true
      }]
    })
    // http = TestBed.inject(HttpTestingController);
    // httpClient = TestBed.inject(HttpClient);

    // The 2 methods (above) are EQUIVALENT to the 2 methods (below):
    http = TestBed.get(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
  });

  it('should append a token to the headers if a token exists', () => {
    spyOn(localStorage, 'getItem').and.returnValue('fakeToken');
    httpClient.get('/test').subscribe(res => {});
    const req = http.expectOne('/test');
    req.flush('ok');
    expect(req.request.headers.get('Authorization')).toEqual('fakeToken');
  })
});
