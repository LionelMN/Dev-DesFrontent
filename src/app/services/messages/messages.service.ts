import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Chat } from '../chats/chats.service';

export type Message = {
  owner: string,
  createdAt: number,
  message : string
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor( private db: AngularFireDatabase) { }


  public createMessage(chatID: string, message: Message) {
    return this.db.list(`chats/${chatID}/messages`).push(message)
  }


  public getMessages(chatID: string) {
    return this.db.list(`chats/${chatID}/messages`).valueChanges();
  }







}
