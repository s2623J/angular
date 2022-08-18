import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavbarComponent } from './navbar.component';

class MockAuthService {
  loggedIn = of();
  logout = jasmine.createSpy('logout');
  isLoggedIn() {}
}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ NavbarComponent ],
      providers: [
        { provide: AuthService, useClass:  MockAuthService },
        // { provide: Router, useClass: RouterStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    authService = fixture.debugElement.injector.get(AuthService);
    router = fixture.debugElement.injector.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('with a user who is logged in', () => {
    beforeEach(() => {
      authService.isLoggedIn = jasmine.createSpy('isLoggedIn').and
        .returnValue(true);
      fixture.detectChanges();
    })

    it('should initialize to see if a user is logged in', () => {
      expect(authService.isLoggedIn).toHaveBeenCalled();
      expect(component.isLoggedIn).toEqual(true);
    })

    it('should have a link have a link to the dashboard when clicking the brand name', () => {
      const link = fixture.debugElement.query(By.css('.navbar-brand'));
      expect(link.attributes['routerLink']).toEqual('/dashboard');
    })

    it('should have a link to logout visible', () => {
      let link = fixture.debugElement.query(By.css('[data-test="logout"]'));
      expect(link.nativeElement.innerText = 'Logout')
    })

    it('should navigate to the home page when logout is clicked', () => {
      spyOn(router, 'navigate');
      component.logout();
      expect(authService.logout).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledOnceWith(['/']);
    })
  })
});
