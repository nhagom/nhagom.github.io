export interface IProduct {
  productId:any,
  productName:string,
  description:string,
  detail:string,
  tag:string,
  price:string,
  image:string
};

export class Product {
  constructor(
  public productId:any=null,
  public productName:string="",
  public description:string="",
  public detail:string[],
  public tag:string[],
  public price:string="",
  public image:string=""){}
}

