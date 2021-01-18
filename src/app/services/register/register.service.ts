import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Specialities } from '../../models/specialities';
import { Users } from '../../models/users';
import { JwtResponse } from '../../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private token: string
  constructor(private http: HttpClient, private cookies:CookieService) { }

  public getAllSpecialities() : Observable<any>{
    return this.http.get(`${environment.backUrl}/specialties`) as Observable<Specialities[]>
  }

  public getAllbyRol(rol : string) : Observable<any>{
    return this.http.get(`${environment.backUrl}/specialties/${rol}`) as Observable<Specialities[]>
  }

  register(user: Users): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${environment.backUrl}/register`,
    user).pipe(tap(
      (res:JwtResponse)=> {
        if (res){
          //guardartoken
          this.saveToken(res.token);
          this.saveUserLogged(user);
        }
      })
    );
  }

  public saveUserLogged(user){
    this.http.get<Users>(`${environment.backUrl}/users/email/${user.email}`).subscribe((userData => {
      localStorage.setItem(
        "user",
        JSON.stringify(userData)
        )

    }))
  }

  public saveToken(token: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    this.token = token;
    this.cookies.set("token", token);
  }


}
