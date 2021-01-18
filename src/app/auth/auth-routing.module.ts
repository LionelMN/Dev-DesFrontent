import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAccountComponent } from '../pages/createAccount/create-account.component';
import { LogInComponent } from '../pages/logIn/log-in.component';

const routes: Routes = [
  {
    path: "register", component: CreateAccountComponent
  },
  {
    path: "login", component: LogInComponent
  },
  {
    path:"", component: LogInComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
