import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from 'src/app/components/login/login.component';

// Purpose: To handle already-logged-in users

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
