import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Posts } from '../../models/posts';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  msg : string
  constructor(private http : HttpClient) { }

  public getAllPosts() : Observable<any>{
    return this.http.get(`${environment.backUrl}/posts`) as Observable<Posts[]>
  }

  public getPost(id) : Observable<any>{
    return this.http.get(`${environment.backUrl}/posts/${id}`) as Observable<Posts>
  }
  public getPostsByNeeds(needs) : Observable<any>{
    return this.http.get(`${environment.backUrl}/posts/need/${needs}`) as Observable<Posts>
  }

  public postPublication(post) : Observable<any>{
    return this.http.post(`${environment.backUrl}/posts`,post).pipe(tap(
      (res) => {
        if (res) {
        this.msg = res;
        }
      })
    );
  }

  public editPost(id, edit) : Observable<any>{
    return this.http.put(`${environment.backUrl}/posts/${id}`,edit).pipe(tap(
      (res)=> {
        if (res){
          this.msg = res;
        }
      }))
  }

  public addPostLiked(post, user) : Observable<any>{
    return this.http.put(`${environment.backUrl}/users/${user._id}`,post).pipe(tap(
      (res)=> {
        if (res){
          this.msg = res;
        }
      }))
  }

  public deletePost(postId): Observable<any>{
/*     console.log("Hola")
 */    return this.http.delete(`${environment.backUrl}/posts/${postId}`)
  }
}
