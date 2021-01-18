import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatChip, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LogInComponent } from './pages/logIn/log-in.component';
import { CreateAccountComponent } from './pages/createAccount/create-account.component';
import { HomeNavComponent } from './components/home-nav/home-nav.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditprofileComponent } from './pages/editprofile/editprofile.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { HomeLoginComponent } from './pages/home-login/home-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostComponent } from './pages/post/post.component';
import { NewpostComponent } from './pages/newpost/newpost.component';
import { EditpostComponent } from './pages/editpost/editpost.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChatlistComponent } from './pages/chatlist/chatlist.component';
import { ChatroomComponent } from './pages/chatroom/chatroom.component';
import { NewchatComponent } from './pages/newchat/newchat.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogInComponent,
    CreateAccountComponent,
    HomeNavComponent,
    HomeLoginComponent,
    PostComponent,
    ProfileComponent,
    EditprofileComponent,
    NewpostComponent,
    EditpostComponent,
    NavbarComponent,
    ChatlistComponent,
    ChatroomComponent,
    NewchatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatChipsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
