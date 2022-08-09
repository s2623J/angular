import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from '../../services/auth/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user: User = {
    username: '',
    password: '',
  };

  dietPreferences = [
    { name: 'BBQ', checked: false },
    { name: 'Burger', checked: false },
    { name: 'Chinese', checked: false },
    { name: 'Deli', checked: false },
    { name: 'Fast Food', checked: false },
    { name: 'Italian', checked: false },
    { name: 'Japanese', checked: false },
    { name: 'Mexican', checked: false },
    { name: 'Pizza', checked: false },
  ];

  errorMessage!: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signup(credentials: User) {
    credentials.dietPreferences = this.getSelectedPreferences();
    this.authService.signup(credentials).subscribe((res) => {
      // Redirect to user dashboard
      this.router.navigate(['/dashboard'])
    }, err => {
      this.errorMessage = err.error.message;
    });
  }

  getSelectedPreferences() {
    let result: string[] = [];
    this.dietPreferences.map((preference) => {
      if (!!preference.checked) {
        result.push(preference.name);
      }
    });
    return result;
  }

  onPrefCheck(index: number) {
    if (!!this.dietPreferences[index].checked) {
      this.dietPreferences[index].checked = false;
    } else {
      this.dietPreferences[index].checked = true;
    }
  }
}
