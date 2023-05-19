import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}
  public static signin: Subject<any> = new Subject<any>();
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
