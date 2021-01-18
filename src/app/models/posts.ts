export interface Posts {
  _id: string,
  text : string,
  owner: string,
  createdAt: number,
  pictures : string[],
  likes :number,
  need: string[],
  title: string,
  category: string
}
