import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class InnerGuard implements CanActivate {
  constructor(private router: Router, private AuthGuardService: AuthGuardService) {}

  canActivate(): boolean {
    if (!this.AuthGuardService.isLoggedIn()) {
      if(this.router.url !==  'login')
      this.router.navigateByUrl('login');
      return false;
    }
    let role = this.AuthGuardService.getRole();
    let url = localStorage.getItem('url');
    if(role){
      setTimeout(() => {
        if(url && !url.includes("login")){
        if(this.router.url !== `dashboard/${url}`){
          this.router.navigateByUrl(`dashboard/${url}`);
          return false;
        }
        else {
          return true
        }
      }
      });
    }
    return true;
  }
}
