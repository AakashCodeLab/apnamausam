import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentWeatherRoutingModule } from './current-weather-routing.module';
import { CurrentComponent } from './current/current.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {SharedModule} from '../shared/shared.module';
import {SwiperModule} from 'angular2-useful-swiper';


@NgModule({
  declarations: [CurrentComponent],
  imports: [
    CommonModule,
    CurrentWeatherRoutingModule,
    NgxSpinnerModule,
    SwiperModule,
    SharedModule
  ]
})
export class CurrentWeatherModule { }
