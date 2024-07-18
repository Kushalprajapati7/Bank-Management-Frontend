import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccount } from '../interface/IAccount';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private _http: HttpClient
  ) { }

  allAccounts(): Observable<IAccount[]> {
    return this._http.get<IAccount[]>('account/')
  }
  createAccount(account: any): Observable<IAccount> {
    return this._http.post<IAccount>('account/', account)
  }
  updateAccount(accountId: string, account: IAccount): Observable<IAccount> {
    return this._http.put<IAccount>(`account/${accountId}`, account)
  }
  deleteAccount(accountId: string,): Observable<void> {
    return this._http.delete<void>(`account/${accountId}`)
  }
  accountByUserId(userId:string): Observable<IAccount[]> {
    return this._http.get<IAccount[]>(`account/${userId}`)
  }

}
