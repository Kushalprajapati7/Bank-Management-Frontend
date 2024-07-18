export interface IAccount extends Document {
    _id?:string;
    user?: string;
    accountNumber?: string,
    accountType: string
    balance?: number
    createdAt?: Date
}