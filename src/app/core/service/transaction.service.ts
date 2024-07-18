import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITransaction } from '../interface/ITransaction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private _http: HttpClient
  ) { }

  addTransaction(transacion: any): Observable<ITransaction> {
    return this._http.post<any>(`transaction/`, transacion)
  }

  allTransactions(): Observable<ITransaction[]> {
    return this._http.get<ITransaction[]>(`transaction/`)
  }

  allTransactionByAccountId(accountId: string): Observable<ITransaction[]> {
    return this._http.get<ITransaction[]>(`transaction/${accountId}`)
  }

  getStatement(accountId: string,startDate: Date, endDate: Date): Observable<any> {
    return this._http.get<any>(`transaction/statement/${accountId}`)
  }
}
