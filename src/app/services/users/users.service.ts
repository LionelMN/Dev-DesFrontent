import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Users } from '../../models/users';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  msg : string
  constructor(private http : HttpClient) { }

  public editUser(user) : Observable<any>{
/*     console.log(user);
 */
    return this.http.put(`${environment.backUrl}/users/${user.username}`,user).pipe(tap(
      (res)=> {
        if (res){
          this.msg = res;
        }
      }))
  }
  public getUser(username): Observable<any>{
    return this.http.get(`${environment.backUrl}/users/${username}`) as Observable<Users>
  }

  public getFollowings(username): Observable<any>{
    return this.http.get(`${environment.backUrl}/users/followings/${username}`) as Observable<Users>
  }
}
