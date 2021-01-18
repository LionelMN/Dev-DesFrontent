import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { CreateAccountComponent } from './pages/createAccount/create-account.component';
import { HomeComponent } from './pages/home/home.component';
import { LogInComponent } from './pages/logIn/log-in.component';
import { HomeLoginComponent } from './pages/home-login/home-login.component';
import { PostComponent } from './pages/post/post.component';
import { EditprofileComponent } from './pages/editprofile/editprofile.component';
import { NewpostComponent } from './pages/newpost/newpost.component';
import { EditpostComponent } from './pages/editpost/editpost.component';
import { ChatroomComponent } from './pages/chatroom/chatroom.component';
import { ChatlistComponent } from './pages/chatlist/chatlist.component';
import { NewchatComponent } from './pages/newchat/newchat.component';


const routes: Routes = [
  {
    path: "register", component: CreateAccountComponent
  },
  {
    path: "login", component: LogInComponent
  },
  {
    path:"", component: HomeComponent
  },
  {
    path:"home", component: HomeLoginComponent
  },
  {
    path:"post/:id", component: PostComponent
  },
  {
    path:"profile/:username", component: ProfileComponent
  },
  {
    path:"editprofile/:username", component: EditprofileComponent
  },
  {
    path:"newpost", component: NewpostComponent
  },
  {
    path:"editpost/:id", component: EditpostComponent
  },
  { /*:username*/
    path:"chat/:id", component: ChatroomComponent
  },
  {
    path:"chatlist", component: ChatlistComponent
  },
  {
    path:"newchat", component: NewchatComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
