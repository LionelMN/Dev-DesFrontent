import { Component, OnInit, Inject } from '@angular/core';
import { PostsService } from '../../services/posts/posts.service';
import { Posts } from '../../models/posts';
import { AuthService } from '../../services/auth.service';
import { Users } from '../../models/users';
import { UsersService } from '../../services/users/users.service';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.css']
})
export class HomeLoginComponent implements OnInit {

  optionSent :string
  roles = ["Developer", "Designer", "Musician", "Writer"];
  postArray : Posts[] = []
  userLogged: Users;
  followingsPosts: Users[] = [];
  showPenguin: boolean;
  showFollowing: boolean;
  showHome: boolean;
  constructor(
    private postsService: PostsService,
    private usersService : UsersService,
    private authService: AuthService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) { }

  getAllPosts(){
    this.postsService.getAllPosts().subscribe(posts => this.postArray = posts)
    this.showErrorNotFound()
  }

  getAllPostsByNeeds(need){
    this.postsService.getPostsByNeeds(need).subscribe(posts => this.postArray = posts)
    this.showErrorNotFound()
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
    this.postsService.editPost(post._id, post).subscribe()
  }

  sentPostLikedToUser(user){
    this.usersService.editUser(user).subscribe()
    this.authService.saveUserLogged(user)
  }

  getUserLogged() {
    this.userLogged = JSON.parse(localStorage.getItem("user"))
  }

  ngOnInit(): void {
    this.getUserLogged()
    if (this.userLogged === null){
      setTimeout(() => {
        this.document.location.reload()
      }, 500);
    }
    this.getAllPostsByNeeds(this.capitalize(this.userLogged.rol[0]))
    this.showErrorNotFound()
  }

  showErrorNotFound(){
    if(this.postArray.length === 0){
      this.showPenguin = true;
    } else {
      this.showPenguin = false;
    }
  }

  deletePost(postId){
    this.postsService.deletePost(postId).subscribe()
    this.document.location.reload()
  }

  capitalize(string){
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

  getFollowings(showFollows){
    this.showFollowing = showFollows;
    this.usersService.getFollowings(this.userLogged.username).subscribe( res => {
      this.followingsPosts.push(res.contacts)
    })
  }

  ngDoCheck(){
    this.showErrorNotFound()
  }

}
