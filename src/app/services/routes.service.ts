import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  private routesKey = 'dashboard-routes';

  getRoutes(): any[] {
    const routes = localStorage.getItem(this.routesKey);
    return routes ? JSON.parse(routes) : [];
  }

  setRoutes(routes: any[]): void {
    localStorage.setItem(this.routesKey, JSON.stringify(routes));
  }

}
