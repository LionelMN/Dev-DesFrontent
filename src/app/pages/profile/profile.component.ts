import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts/posts.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
   username : string;
   user : Users;
   userLogged : Users;
  constructor(
    private authService : AuthService,
    private usersService : UsersService,
    private route : ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.getUser();
    this.getUserLogged()
  }

  getUser() {
    this.username = this.route.snapshot.paramMap.get('username')
    this.usersService.getUser(this.username).subscribe( user => this.user = user)
  }

  logOut() {
    this.authService.logout();
    this.router.navigateByUrl(`/`);
  }

  getUserLogged() {
    this.userLogged = JSON.parse(localStorage.getItem("user"))
  }

  followUser(user){
   if (this.userLogged.contacts.includes(user)){
     this.userLogged.contacts =this.userLogged.contacts.filter( follow => follow != user)
   } else {
     this.userLogged.contacts.push(user)
   }
   this.sentFollowToBD(this.userLogged)
 }

  sentFollowToBD(user){
    this.usersService.editUser(user).subscribe()
    this.authService.saveUserLogged(user)
  }


}
