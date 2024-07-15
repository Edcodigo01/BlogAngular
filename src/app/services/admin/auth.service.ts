import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfing } from '../../app.config';
import { UserModel } from '../../../../../formularios/src/app/models/user.model';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  ENDPOINT = AppConfing.ENDPOINT;

  urlRefreshToken = 'admin/refresh-token';
  urlLogin = 'admin/login';
  urlLogout = 'admin/logout';
  userAuth: any;

  constructor(private http: HttpClient, private router: Router) {}

  refreshToken() {
    let auth = this.getAuth();
    return this.http.post(this.ENDPOINT + this.urlRefreshToken, this.getAuth(), { headers: new HttpHeaders().set('authorization', `Bearer ${auth.token}`) }).pipe(tap(auth => this.saveAuth(auth)));
  }

  login(user: UserModel) {
    return this.http.post(this.ENDPOINT + this.urlLogin, user);
  }

  saveAuth(user: any) {
    let userAuth: any = user;
    localStorage.setItem('user', JSON.stringify(userAuth));
    this.router.navigateByUrl('administrar/articulos');
  }

  getAuth() {
    let user: any = localStorage.getItem('user');
    if (user) {
      var array: any = localStorage.getItem('user');
      array = JSON.parse(array);
      return array.user;
    }
    return user;
  }

  logout(){
    localStorage.removeItem('user');
    this.router.navigateByUrl('administrar/inicio-de-sesion');
    return this.http.get(this.ENDPOINT + this.urlLogout).subscribe();
  }

}
