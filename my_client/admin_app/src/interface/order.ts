export interface IOrder {
  orderId:string,
  customerId:string,
  customerName:string,
  customerEmail:string,
  customerPhone:string,
  customerAddress:string,
  orderDate: string,
  shipMethod: string,
  orderItems: Array<OItem>
}

export interface OItem {
  productId:string,
  productName:string,
  unitPrice: number,
  shipMethod: string,
  quantity:number
}
