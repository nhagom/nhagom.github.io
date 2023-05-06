export class Order {
  constructor(
    public customerName: string ="",
    public customerEmail: string ="",
    public customerPhoneNumb: string ="",
    public customerAddress: string ="",
    public totalPrice: number = 0,
    public shipMethod: string = "",
    public orderItems: Array<Item>=[]
  )
  {}
}
export class Item {
  constructor(
    public productId:string ="",
    public productName: string ="",
    public price: number = 0,
    public quantity: number= 0,
  ){}
}
