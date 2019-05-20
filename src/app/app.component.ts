import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private spinner: NgxSpinnerService) {
    if (window.navigator) {
      window.navigator.geolocation.getCurrentPosition(position => {
  
      });
    }
   }
  title = 'weather-app';
  ngOnInit() {
  }
}

