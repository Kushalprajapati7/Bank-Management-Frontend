import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { IUser } from '../interface/IUser';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private tokenKey = 'auth_token';
  private roleKey = 'userRole';
  private isAuthenticated: boolean = false;
  private userRole: string = '';
  private userName: string = ''
  private userId: string = ''
  private userNameKey = 'userName'
  private userIdKey = 'userId'
  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _permissionsService: NgxPermissionsService
  ) { }

  register(user: IUser): Observable<IUser> {
    return this._http.post<IUser>(`auth/register`, user);
  }

  login(email: string, password: string): Observable<any> {
    return this._http.post<{ token: string, role: string, userName: string, userId: string }>(`auth/login`, { email, password }).pipe(
      map(response => {
        this.token = response.token;
        this.isAuthenticated = true;
        this.userRole = response.role;
        this.userName = response.userName;
        this.userId = response.userId;
        localStorage.setItem(this.tokenKey, this.token);
        localStorage.setItem(this.roleKey, this.userRole);
        localStorage.setItem(this.userNameKey, this.userName);
        localStorage.setItem(this.userIdKey, this.userId);
        this._permissionsService.loadPermissions([this.userRole]);
        return response;
      })
    )
  }

  getRole() {
    return localStorage.getItem(this.roleKey)
  }
  logout(): void {
    this.token = null;
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    this._router.navigate(['auth/login']);
  }

  getToken(): string | null {
    return this.token;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated, !!this.token;
  }

  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    return headers;
  }
  isAdmin(): boolean {
    const storedRole = localStorage.getItem(this.roleKey);
    return storedRole === 'admin';
  }


}
