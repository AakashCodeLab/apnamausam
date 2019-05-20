import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private spinner: NgxSpinnerService) {

   }
  title = 'weather-app';
  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();
    if (window.navigator) {
      window.navigator.geolocation.getCurrentPosition(position => {
  
      });
  }
  }
}

