import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private AuthGuardService: AuthGuardService, private router: Router) { }

  canActivate(): boolean {
    let url = localStorage.getItem('url');
    if (this.AuthGuardService.isLoggedIn()) {
      if(url){
        this.router.navigate([`dashboard/${url}`]);
      }
      return false;
    }
    return true;
  }
}
