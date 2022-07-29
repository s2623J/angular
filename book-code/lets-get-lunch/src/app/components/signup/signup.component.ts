import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from '../../services/auth/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  user: User = {
    username: '',
    password: ''
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  signup(credentials: User) {
    this.authService.signup(credentials).subscribe(res => {
      console.log('res: ', res);

      // Redirect to user dashboard
    })
  }
}
