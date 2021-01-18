import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';


export type Chat  = { 
  users:{
    [key : string]: {
      username: string,
      lastConnection : number
    }
  },
  messages: {
    [key: string]: {
      owner: string,
      message: string,
      createdAt  : number
    }
  }
  avatar: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private db : AngularFireDatabase) {


  }

  // TODO: Cambiar, esto solo debería de traer tus chats, no la tabla chats entera
  public getMyChats(): Observable<Chat[]>{
      return this.db.list<Chat>(`chats`)
        .valueChanges()
  }



  // TODO: Cambiar, esto solo debería de traer tus chats, no la tabla chats entera
  public createChat(users: string[]) {
    const id = this.db.createPushId();
    return this.db.object(`chats/${id}`).set({
      messages: '',
      avatar: '',
      users: users,
      createdAt: Date.now(),
      id : id
      })
}

// public createChat(users: string[]) {
//   const id = this.db.createPushId();
//   return this.db.list(`chats`).push({
//     messages: ["Saluda a tu nuevo amigo"],
//     avatar: '',
//     users: users,
//     createdAt: Date.now()
//     })
// }


public getChatById(chatID: string) : Observable<Chat> {
  return this.db.object<Chat>(`chats/${chatID}`).valueChanges();

  // truco : parar recorrer el .messages al recibirlo hago =>   const messages = Object.values( recibido.messages );

}

}
