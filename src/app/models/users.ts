import { Posts } from './posts';
export interface Users {
  _id: string,
  name: string,
  username: string,
  email: string,
  password: string,
  contacts: any[],
  post: any,
  rol: string[],
  skills : string[],
  postsLiked: Posts[],
  posts: Posts[],
  interests: string[],
  img: string,
  websites: string[],
  ubication: string,
  biography:string
}
