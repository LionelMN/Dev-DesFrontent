import { Component, OnInit } from '@angular/core';
import { Posts } from '../../models/posts';
import { PostsService } from '../../services/posts/posts.service';
import { ActivatedRoute } from '@angular/router';
import { Users } from '../../models/users';
import { UsersService } from '../../services/users/users.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  id : string
  post : any
  userLogged : Users
  constructor(
    private postService: PostsService,
    private routes: ActivatedRoute,
    private userService: UsersService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getPost()
    this.getUserLogged()
  }

  getPost(){
    this.id = this.routes.snapshot.paramMap.get('id')
    this.postService.getPost(this.id).subscribe( post => this.post= post)
  }

  getUserLogged(){
    this.userLogged = JSON.parse(localStorage.getItem("user"))
  }

  modifyLikes(post){
    post.likes = parseInt(post.likes)
   if (this.userLogged.postsLiked.includes(post._id)){
     post.likes += -1;
     this.userLogged.postsLiked =this.userLogged.postsLiked.filter( id => id != post._id)
   } else {
     post.likes += +1
     this.userLogged.postsLiked.push(post._id)
   }
   this.sentLikeToBd(post)
   this.sentPostLikedToUser(this.userLogged)
 }

 sentLikeToBd(post){
   this.postService.editPost(post._id, post).subscribe()
 }

 sentPostLikedToUser(user){
   this.userService.editUser(user).subscribe()
   this.authService.saveUserLogged(user)
 }

}
