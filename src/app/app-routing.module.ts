import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'current',
    pathMatch: 'full'
  },
  {
    path: 'current',
    loadChildren: './current-weather/current-weather.module#CurrentWeatherModule'
  },
  {
    path: 'forcast',
    loadChildren: './forcast-weather/forcast-weather.module#ForcastWeatherModule'
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
