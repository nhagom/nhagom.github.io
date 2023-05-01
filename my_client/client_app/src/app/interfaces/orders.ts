export interface IOrder {
  orderId:string,
  customerName:string,
  customerEmail:string,
  customerPhone:string,
  customerAddress:string,
  orderDate: string,
  orderItems: Array<OItem>
}

export interface OItem {
  productId:string,
  productName:string,
  unitPrice: number,
  quantity:number
}
