import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentWeatherRoutingModule } from './current-weather-routing.module';
import { CurrentComponent } from './current/current.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {SharedModule} from '../shared/shared.module';
import {OwlModule} from 'ngx-owl-carousel';
import {SwiperModule} from 'angular2-useful-swiper';

@NgModule({
  declarations: [CurrentComponent],
  imports: [
    CommonModule,
    CurrentWeatherRoutingModule,
    NgxSpinnerModule,
    SharedModule,
    OwlModule,
    SwiperModule
  ]
})
export class CurrentWeatherModule { }
