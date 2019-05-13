import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ForcastComponent} from './forcast/forcast.component';

const routes: Routes = [
  { path: '', component: ForcastComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForcastWeatherRoutingModule { }
