import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subscriber, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptorService implements HttpInterceptor {
  urlLogin:string = '/administrar/inicio-de-sesion';
  auth:any;
  refresh:boolean = false;
  tokenIntercept = false;
  constructor(private router:Router, private authService:AuthService, private toastr:ToastrService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  console.log('INTERCEPTADO');
    let request = req;
    this.auth =  this.authService.getAuth();
    if(!request.url.includes('/admin/') || request.url.includes('login') || request.url.includes('refresh-token')){

      return <any> next.handle(request);
    }

    if (this.auth) {
      request = req.clone({setHeaders: {authorization: `Bearer ${ this.auth.token }`}});

    }else{

      this.router.navigateByUrl(this.urlLogin);
    }

    return  <any>next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.router.navigateByUrl(this.urlLogin);
        }
        return throwError( err );
      })
    );

  }

}
