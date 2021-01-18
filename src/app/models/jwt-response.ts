export interface JwtResponse {
  dataUser: {
    id: string,
    name: string,
    username: string,
    email: string,
    password: string,
    contact: any,
    post: any,
    rol: string,
  }
  token: any
}
