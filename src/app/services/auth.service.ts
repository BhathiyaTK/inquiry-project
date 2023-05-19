import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IndexService } from './index.service';
import { map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route: Router, private indexService: IndexService) { }

  userLogin(credentials: any) {
    return this.indexService.post('api/Auth/login', credentials).pipe(
      map(response => {
        if (response && response.accessToken) {
          localStorage.setItem('user-JWT', (response.accessToken).toString());
          return response;
        }
        return false;
      })
    );
  }

  userLogout() {
    let removeToken = localStorage.removeItem('user-JWT');
    if (removeToken == null) {
      this.route.navigate(['/']);
    }
  }

  get isUserLoggedIn(): boolean {
    let token = localStorage.getItem('user-JWT');
    return (token !== null) ? true : false;
  }

  get currentUser() {
    const token = localStorage.getItem('user-JWT');
    if (!token) {
      return null;
    }
    return new JwtHelperService().decodeToken(token);
  }

  getToken() {
    return localStorage.getItem('user-JWT');
  }
}
