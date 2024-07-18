import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor(
    private _router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const baseUrl = 'http://localhost:3000/api';
    const token = localStorage.getItem('auth_token');
    let clonedReq = req;

    const modifiedUrl = req.url.startsWith('http') ? req.url : `${baseUrl}${req.url.startsWith('/') ? '' : '/'}${req.url}`;

    if (token) {
      clonedReq = req.clone({
        url: modifiedUrl,
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    } else {
      clonedReq = req.clone({ url: modifiedUrl });
    }


    return next.handle(clonedReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this._router.navigate(['/auth/login']);
        }
        return throwError(() => err);
      })
    );
  }
}
