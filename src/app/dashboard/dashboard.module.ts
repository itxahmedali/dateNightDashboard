import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';    
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap'; 
import { NgxPaginationModule } from 'ngx-pagination';
import { CarouselModule } from 'ngx-owl-carousel-o'; 
import { NgApexchartsModule } from 'ng-apexcharts';
import { DummyComponent } from './dummy/dummy.component';
import { ModesComponent } from './modes/modes.component';
import { PrePlanDatesComponent } from './pre-plan-dates/pre-plan-dates.component';
import { UserComponent } from './user/user.component';
import { EventComponent } from './event/event.component';
import { PingsComponent } from './pings/pings.component';
import { EventChildComponent } from './event-child/event-child.component';
import { PingChildComponent } from './ping-child/ping-child.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DummyComponent,
    ModesComponent,
    PrePlanDatesComponent,
    UserComponent,
    EventComponent,
    PingsComponent,
    EventChildComponent,
    PingChildComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LayoutModule,
    SharedModule,
    NgbModule,
    NgbNavModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    CarouselModule
  ]
})
export class DashboardModule { }
