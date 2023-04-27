export interface IUser {
  customerEmail: string;
  password: string;
  }
  export class IUser {
    constructor(
      public customerEmail:string="",
      public password:string=""
    ){}
  }
