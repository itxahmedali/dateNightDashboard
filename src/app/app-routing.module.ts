import { AuthGuard } from './guards/auth.guard';
import { InnerGuard } from './guards/inner.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component:LoginComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    data: { title: 'dashboard', roles: 'dashboard' },
    canActivate: [InnerGuard],
  }
];

@NgModule({
  imports: [BrowserAnimationsModule, RouterModule.forRoot(routes
    // ,{ enableTracing: true }
    )],
  exports: [RouterModule],
})
export class AppRoutingModule {}
