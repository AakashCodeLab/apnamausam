import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CurrentComponent} from './current/current.component';

const routes: Routes = [
  { path: '', component: CurrentComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrentWeatherRoutingModule { }
