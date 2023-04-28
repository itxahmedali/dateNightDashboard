import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DummyComponent } from './dummy/dummy.component';
import { RoleGuard } from '../guards/role.guard';
import { ModesComponent } from './modes/modes.component';
import { PrePlanDatesComponent } from './pre-plan-dates/pre-plan-dates.component';
import { UserComponent } from './user/user.component';
import { EventComponent } from './event/event.component';
import { PingsComponent } from './pings/pings.component';
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
        path: 'activity',
        component: EventComponent,
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
        path: 'pings',
        component: PingsComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['admin'] },
      },
      {
        path: 'settings',
        component: DummyComponent,
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
