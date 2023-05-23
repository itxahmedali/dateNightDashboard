import { NgbCarouselModule, NgbModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';
import { FilterPipe } from '../pipes/filter.pipe';
import { EllipsisPipe } from '../pipes/ellipses.pipe';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ImgComponent } from './img/img.component';
import { SortByPipe } from '../pipes/sort.pipe';
import { FormComponent } from './form/form.component';
import { AccordionComponent } from './accordion/accordion.component';
import { AutoPlaceComponent } from './auto-place/auto-place.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataTablesModule } from 'angular-datatables';
@NgModule({
  declarations: [
    EllipsisPipe,
    FilterPipe,
    ImgComponent,
    SortByPipe,
    FormComponent,
    AccordionComponent,
    AutoPlaceComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgbModule,
    NgxPaginationModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCarouselModule,
    CarouselModule,
    NgbTooltip,
    LazyLoadImageModule,
    DataTablesModule,
    ToastrModule.forRoot({
    preventDuplicates: true,
    }),

  ],
  exports:[
    NgSelectModule,
    EllipsisPipe,
    FilterPipe,
    ImgComponent,
    SortByPipe,
    FormComponent,
    AccordionComponent,
    AutoPlaceComponent,
    NgxPaginationModule
  ]
})
export class SharedModule { }
