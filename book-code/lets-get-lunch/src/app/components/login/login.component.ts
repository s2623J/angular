import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from "../../services/auth/user";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = {
    username: '',
    password: ''
  };
  errorMessage!: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(credentials: User) {
    this.authService.login(credentials).subscribe(res => {
      this.router.navigate(['./dashboard'])
      }, (err) => {
        this.errorMessage = err.error.message;
    })
  }
}
