import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RoleGuard } from '../guards/role.guard';
import { ModesComponent } from './modes/modes.component';
import { PrePlanDatesComponent } from './pre-plan-dates/pre-plan-dates.component';
import { UserComponent } from './user/user.component';
import { EventComponent } from './event/event.component';
import { PingsComponent } from './pings/pings.component';
import { EventChildComponent } from './event-child/event-child.component';
import { PingChildComponent } from './ping-child/ping-child.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'modes',
        pathMatch: 'full',
      },
      {
        path: 'modes',
        component: ModesComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['admin'] },
      },
      {
        path: 'pre-plan-dates',
        component: PrePlanDatesComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['admin'] },
      },
      {
        path: 'events',
        component: EventComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['admin'] },
      },
      {
        path: 'event-details',
        component: EventChildComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['admin'] },
      },
      {
        path: 'users',
        component: UserComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['admin'] },
      },
      {
        path: 'users/user-detail/:id',
        component: UserDetailComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['admin'] },
      },
      {
        path: 'pings-category',
        component: PingsComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['admin'] },
      },
      {
        path: 'pings',
        component: PingChildComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['admin'] },
      },
      {
        path: 'restaurants',
        component: RestaurantsComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['admin'] },
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
