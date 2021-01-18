import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { CreateAccountComponent } from '../pages/createAccount/create-account.component';
import { LogInComponent } from '../pages/logIn/log-in.component'
import { AuthService } from '../services/auth.service';



@NgModule({
  declarations: [ CreateAccountComponent, LogInComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AuthRoutingModule,
  ],
  providers: [AuthService]
})
export class AuthModule { }
