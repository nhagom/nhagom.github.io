export class customer{
  constructor(
    public _id:any = null,
    public customerId:number=0,
    public customerName: string="",
    public customerEmail:string ="",
    public customerPhoneNumb:string ="",
    public customerBirth:Date,
    public customerGender:string ="",
    public customerAddress:string="",
    public password:string="",
  ){}
}
