export interface IBlog {
  blogId: string,
  blogName: string,
  blogTitle: string,
  shortContent: string,
  content1: string,
  content2: string,
  content3: string,
  imgTitle: string
}

export class Blog {
  constructor(
    public blogId: any = null,
    public blogName: string = "",
    public blogTitle: string = "",
    public shortContent: string = "",
    public content1: string = "",
    public content2: string = "",
    public content3: string = "",
    public imgTitle: string = ""
  ){}
}
