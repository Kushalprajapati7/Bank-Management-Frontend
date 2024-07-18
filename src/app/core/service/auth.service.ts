
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
  private tokenKey = 'auth_token';
  private roleKey = 'userRole';
  private userNameKey = 'userName';
  private userIdKey = 'userId';
  isAuthenticated: boolean = false;
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
        this.isAuthenticated = true;
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.roleKey, response.role);
        localStorage.setItem(this.userNameKey, response.userName);
        localStorage.setItem(this.userIdKey, response.userId);
        this._permissionsService.loadPermissions([response.role]);
        // if(response.role === 'admin'){
        //   this._router.navigate(['/dashboard'])
        // }
        // else{
        // this._router.navigate(['/home']);
        // }
        return response;
      })
    )
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.userNameKey);
    localStorage.removeItem(this.userIdKey);
    this._router.navigate(['auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  isAdmin(): boolean {
    const storedRole = this.getRole();
    return storedRole === 'admin';
  }
}
