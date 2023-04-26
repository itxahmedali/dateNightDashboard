import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DummyComponent } from './dummy/dummy.component';
import { RoleGuard } from '../guards/role.guard';
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
        component: DummyComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['admin'] },
      },
      {
        path: 'foodItems',
        component: DummyComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['admin'] },
      },
      {
        path: 'category',
        component: DummyComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['admin'] },
      },
      {
        path: 'sub-category',
        component: DummyComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['admin'] },
      },
      {
        path: 'add-ons',
        component: DummyComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['admin'] },
      },
      {
        path: 'pre-plan-dates',
        component: DummyComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['admin'] },
      },
      {
        path: 'activity',
        component: DummyComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['admin'] },
      },
      {
        path: 'pings',
        component: DummyComponent,
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
