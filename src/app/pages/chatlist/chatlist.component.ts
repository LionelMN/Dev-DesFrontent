import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import { Chat, ChatsService } from 'src/app/services/chats/chats.service';

@Component({
  selector: 'app-chatlist',
  templateUrl: './chatlist.component.html',
  styleUrls: ['./chatlist.component.css']
})
export class ChatlistComponent implements OnInit {
  username : string
  userLogged : Users
  chats = [];
  userAvatar = [JSON.parse(localStorage.getItem("user")).img];


  constructor(private chatsService : ChatsService) {


  }

  ngOnInit(): void {
    this.getUserLogged()
    this.username = this.userLogged.username
    this.chatsService.getMyChats()
      .subscribe(chats => {
/*         console.log({chats}); */

        this.chats = chats;
      })


  }

  getLastMessage(chat : Chat) {
    const messages = Object.values( chat.messages );
    return messages[messages.length - 1];
  }

  getFriendName(chat: Chat) {
    const dataUser = localStorage.getItem("user")
    const goodDataUser = JSON.parse(dataUser)
    const username = goodDataUser.username
/*     console.log(username) */
    if (chat.users[0]==username) {
    return chat.users[1]
    } else {
    return chat.users[0]}
  }


  createChat(otherUser: string) {
    this.chatsService.createChat(['YuniorGlez', otherUser])
  }

  getUserLogged() {
    this.userLogged = JSON.parse(localStorage.getItem("user"))
  }

}
