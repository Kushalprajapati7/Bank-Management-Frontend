import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interface/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient
  ) { }

  allUser(): Observable<IUser[]> {
    return this._http.get<IUser[]>('user/')
  }

  updateUser(userId: string, user: IUser): Observable<IUser> {
    return this._http.put<IUser>(`user/${userId}`, user)
  }

  deleteUser(userId: string): Observable<void> {
    return this._http.delete<void>(`user/${userId}`)
  }
  getUserById(userId: string): Observable<IUser> {
    return this._http.get<IUser>(`user/${userId}`)
  }
  addUser(user: IUser): Observable<IUser> {
    return this._http.post<IUser>(`user/`, user)
  }

}
