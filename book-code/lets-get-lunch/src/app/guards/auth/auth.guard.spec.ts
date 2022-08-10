import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { tokenGetter } from 'src/app/app.module';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthGuard } from './auth.guard';

class MockRouter {
  navigate(path: string) {}
}

describe('AuthGuard', () => {
  describe('canActivate', () => {
    let authService: AuthService;
    let http: HttpTestingController;
    let authGuard: AuthGuard;
    let router: Router;
    
    beforeEach(async() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule,
          JwtModule.forRoot({
            config: {
              tokenGetter: tokenGetter
            }
          })
        ]
      })
      authService = TestBed.inject(AuthService);
      router = TestBed.inject(Router);
      http = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
      expect(authService).toBeTruthy();
    });

    it('should return true for a logged in user', () => {
      authGuard = new AuthGuard(authService, router);
      localStorage.setItem('Authorization', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTIxNzY4NTY3MzV9.2LxoVtRmowCeUiXUS0bMkMt5pT-FTB3VY3DSmUXwH7Y");
      expect(authGuard.canActivate()).toEqual(true);
      localStorage.removeItem('Authorization');
    })

    it('should navigate to home for a logged out user', () => {
      authGuard = new AuthGuard(authService, router);
      spyOn(router, 'navigate');     
      expect(authGuard.canActivate()).toEqual(false);
      expect(router.navigate).toHaveBeenCalledOnceWith(['/']);
    })
  })
});
