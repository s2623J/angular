import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from 'src/app/components/signup/signup.component';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [SignupComponent],
  imports: [CommonModule, SignupRoutingModule, FormsModule],
})
export class SignupModule {}
