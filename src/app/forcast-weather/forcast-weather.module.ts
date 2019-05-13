import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForcastWeatherRoutingModule } from './forcast-weather-routing.module';
import { ForcastComponent } from './forcast/forcast.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [ForcastComponent],
  imports: [
    CommonModule,
    ForcastWeatherRoutingModule,
    SharedModule
  ]
})
export class ForcastWeatherModule { }
