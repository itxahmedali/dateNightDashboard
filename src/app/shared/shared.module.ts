import { NgbCarouselModule, NgbModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
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
// import { EllipsisPipe } from '../pipes/ellipses.pipe';
// import { FilterPipe } from '../pipes/filter.pipe';
@NgModule({
  declarations: [
    EllipsisPipe,
    FilterPipe,
    ImgComponent,
    SortByPipe,
    FormComponent
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
    FormComponent
  ]
})
export class SharedModule { }