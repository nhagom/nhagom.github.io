export interface IProduct {
  productId:any,
  productName:string,
  description:string,
  set:string,
  size:string,
  trait:string,
  style:string,
  price:string,
  image:string
}
export class Product{
  constructor(
    public productId:any="",
    public productName:string="",
    public description:string="",
    public set:string="",
    public size:string="",
    public trait:string="",
    public style:string="",
    public price:string="",
    public image:string="")
    {}
}
