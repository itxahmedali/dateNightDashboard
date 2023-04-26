import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private AuthGuardService: AuthGuardService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const allowedRoles = route.data?.['allowedRoles'];
    const userRole = this.AuthGuardService.getRole()

    if (allowedRoles.includes(userRole)) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
