import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { LoginModule } from 'src/app/modules/login/login.module';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/services/auth/user';
import { LoginComponent } from './login.component';

class MockAuthService {
  login(credentials: User) {}
}

class MockRouter {
  navigate(path: string) {}
}

let component: LoginComponent;
let fixture: ComponentFixture<LoginComponent>;
let authService: AuthService;
let router: Router;

describe('LoginComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [LoginModule],
    })
      .overrideComponent(LoginComponent, {
        set: {
          providers: [
            { provide: AuthService, useClass: MockAuthService },
            { provide: Router, useClass: MockRouter },
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = fixture.debugElement.injector.get(AuthService);
    router = fixture.debugElement.injector.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the dashboard with valid credentials', () => {
    fixture.debugElement.query(By.css('input#username')).nativeElement.value =
      'user';
    fixture.debugElement.query(By.css('input#password')).nativeElement.value =
      'password';
    fixture.debugElement
      .query(By.css('input#username'))
      .nativeElement.dispatchEvent(new Event('input'));
    fixture.debugElement
      .query(By.css('input#password'))
      .nativeElement.dispatchEvent(new Event('input'));

    spyOn(authService, 'login').and.callFake(() => {
      return of({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE5MTIxNzY4NTY3MzV9.2LxoVtRmowCeUiXUS0bMkMt5pT-FTB3VY3DSmUXwH7Y" });
    });

    spyOn(router, 'navigate');

    fixture.debugElement.nativeElement.querySelector('button.btn.btn-default').click();
    
    expect(authService.login).toHaveBeenCalledWith({
      username: 'user',
      password: 'password'
    })

    expect(router.navigate).toHaveBeenCalledWith(['./dashboard']);
  })

  it('should display an error message for a user who does not exist', () => {
    fixture.debugElement.query(By.css('input#username')).nativeElement.value =
      'doesnotexist';
    fixture.debugElement.query(By.css('input#password')).nativeElement.value =
      'password';
    fixture.debugElement
      .query(By.css('input#username'))
      .nativeElement.dispatchEvent(new Event('input'));
    fixture.debugElement
      .query(By.css('input#password'))
      .nativeElement.dispatchEvent(new Event('input'));

    spyOn(authService, 'login').and.callFake(() => {
      return throwError({ error: { message: 'User could not be found' } });
    });

    spyOn(router, 'navigate');

    fixture.debugElement.nativeElement.querySelector('button.btn.btn-default').click();
    fixture.autoDetectChanges();
    
    expect(authService.login).toHaveBeenCalledWith({
      username: 'doesnotexist',
      password: 'password'
    })

    expect(router.navigate).not.toHaveBeenCalled();
    const errorMessage = fixture.debugElement.query(By.css('.alert'));
    expect(errorMessage.nativeElement.textContent).toContain('User could not be found');
  })
});
