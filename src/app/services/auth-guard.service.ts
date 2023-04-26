import { of } from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class   AuthGuardService {
  isLogin = false;

  roleAs: any;

  constructor() { }

  login(value: string) {
    this.isLogin = true;
    this.roleAs = value;
    localStorage.setItem('loginstate', 'true');
    localStorage.setItem('role', value);
    return of({ success: this.isLogin, role: value });
  }

  isLoggedIn() {
    return localStorage.getItem('access_token')
  }

  getRole() {
    return localStorage.getItem('role');
  }

}
