import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { Auth } from '../servicios/auth/auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authServicio: Auth, private router: Router){}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (!req.url.includes('login')) {
      if (token && this.authServicio.isTokenExpired()) {
        this.authServicio.logout();
        this.router.navigate(['/login']);
        return EMPTY;
      }

      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      if(!token){
        this.router.navigate(['/login'])
      }
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.authServicio.logout();
          this.router.navigate(['/login']);
        }

        return throwError(() => error);
      })
    );
  }
}