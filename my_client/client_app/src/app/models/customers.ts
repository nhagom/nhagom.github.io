export class Customers {
  constructor(
    public customerName:string="",
    public customerEmail:string="",
    public customerPhoneNumb:string="",
    public customerBirth:string="",
    public customerGender:string="",
    public customerAddress:string="",
    public password:string="",
  ) {}
}
export class ForgotPassCustomers {
  constructor(
    public customerEmail:string="",
    public password:string="",
  ) {}
}
