import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from '../models/users';
import { JwtResponse } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  authSubject = new BehaviorSubject(false)
  private token: string
  constructor(
    private http: HttpClient,
    private cookies: CookieService
    ) { }


  login(user: Users): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${environment.backUrl}/signin`,
      user).pipe(tap(
        (res: JwtResponse) => {
          if (res) {
            // guardar token
            this.saveToken(res.token);
            this.saveUserLogged(user)
          }
        })
      );
  }

  saveUserLogged(user) {
    localStorage.removeItem("user")
    this.http.get<Users>(`${environment.backUrl}/users/email/${user.email}`).subscribe((userData => {
      localStorage.setItem(
        "user",
        JSON.stringify(userData)
        )

    }))
  }

  logout() :void {
    this.token = "";
    localStorage.removeItem("ACCESS_TOKEN")
    localStorage.removeItem("EXPIRE_IN")
    localStorage.removeItem("user")
  }

  public saveToken(token: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    this.token = token;
    this.cookies.set("token", token);
  }

  public getTokenFromCookies(){
    return this.cookies.get("token");
  }

  private getToken(): string{
    if(!this.token){
      this.token = localStorage.getItem("ACCESS_TOKEN")
    }
    return this.token;
  }


}
