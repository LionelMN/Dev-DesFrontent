import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PostsService } from '../../services/posts/posts.service';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';
import { Posts } from 'src/app/models/posts';
import { Users } from '../../models/users';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userLogged : Users;
  selectedOption : string
  search :string
  roles = ["Developer", "Designer", "Musician", "Writer"];
  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
    private router: Router,
  ) { }

  @Output()
  showFollow: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  postArray: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  showHome: EventEmitter<boolean> = new EventEmitter<boolean>();

  sentNeedToHome(need){
    this.postArray.emit(need);
  }

  getAllPostsByNeeds(need){
    this.postsService.getPostsByNeeds(need).subscribe(posts => this.postArray = posts)
  }

  getUserByUsername(username){
    this.usersService.getUser(username).subscribe(res => {
      this.router.navigateByUrl(`/profile/${username}`);
    })
  }

  showHomePosts():void{
    this.showHome.emit(true)
    this.showFollow.emit(false)
  }

  showFollowPosts():void{
    this.showHome.emit(false)
    this.showFollow.emit(true)
  }

  getUserLogged() {
    this.userLogged = JSON.parse(localStorage.getItem("user"))
  }

  ngOnInit(): void {
    this.getUserLogged()
  }
}
