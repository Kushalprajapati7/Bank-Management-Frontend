export interface ITransaction {
    _id?:string;
    account?:string;
    toAccount?:string;
    type?:string;
    amount?:number;
    accountBalance?:number;
    description?:string;
    createdAt?:Date;
}