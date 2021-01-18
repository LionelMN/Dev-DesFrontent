import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import { ChatsService } from 'src/app/services/chats/chats.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-newchat',
  templateUrl: './newchat.component.html',
  styleUrls: ['./newchat.component.css']
})
export class NewchatComponent implements OnInit {

  followings : Users[] = [];

  username = "";

  userLogged : Users;

  constructor(private chatsService : ChatsService, public usersService : UsersService) { }

  ngOnInit(): void {
    this.getUserLogged()
    this.getFollowings()
    this.username = this.userLogged.username
/*     console.log(this.username);
 */  }

  createChat(otherUser: string) {
    this.chatsService.createChat([this.userLogged.username, otherUser])
  }

  getFollowings(){
    this.usersService.getFollowings(this.userLogged.username).subscribe( res => {
      this.followings.push(res.contacts)
    })
  }

  getUserLogged() {
    this.userLogged = JSON.parse(localStorage.getItem("user"))
  }
}
