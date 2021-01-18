import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Users } from 'src/app/models/users';
import { ChatsService } from 'src/app/services/chats/chats.service';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { Chat } from '../../services/chats/chats.service';
import {  ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  username : string
  userLogged : Users
  messages : {
    owner: string,
    message: string,
    createdAt  : number
  } [] = [];
  idChatRoom : string;
  newMessage : string;

  constructor(private route : ActivatedRoute, private chatsService : ChatsService, private messageService : MessagesService) { }



  ngOnInit(): void {
    this.getUserLogged()
    this.username = this.userLogged.username
    this.idChatRoom = this.route.snapshot.paramMap.get("id")
    this.chatsService.getChatById(this.idChatRoom).subscribe(chat => {
    this.messages = Object.values( chat.messages );
    })

    this.messages = []
  }

  sendMessage(send : string){
  this.messageService.createMessage(this.idChatRoom,  {
    owner: JSON.parse(localStorage.getItem("user")).username ,
    message: send,
    createdAt  : Date.now()
  }).then(send => {
    if(send){
      this.newMessage = null;
    }
  })


  }

  getUserLogged() {
    this.userLogged = JSON.parse(localStorage.getItem("user"))
  }


}
