 import { Component, OnInit } from '@angular/core';
 import {WeatherDataService} from '../../services/weather-service.service';
 import { FormGroup, FormControl, Validators } from '@angular/forms';
 import { NgxSpinnerService } from 'ngx-spinner';
 import {MatSnackBar} from '@angular/material';

 @Component({
  selector: 'app-forcast',
  templateUrl: './forcast.component.html',
  styleUrls: ['./forcast.component.css']
})
export class ForcastComponent implements OnInit {

  lat: any = 19.0760;
  lng: any =  72.8777;
  currentTimestamp;
  currentDate;
  lastUpdateAt;
  city = 'mumbai';
  location: any;
  Math: any;
  currentWeather = {
    coord: {
      lon: null,
      lat: null},
    name: null,
    main: {
      temp: null,
      temp_min: null,
      temp_max: null ,
      pressure: null,
      humidity: null
    },
    sys: {
      country: ''
    },
    weather: [{description: null, id: null, icon: null}],
    wind: {
      speed: null
    }
  };

  forecast = [];
  constructor(private weatherdataservice: WeatherDataService, private spinner: NgxSpinnerService, private snackbar: MatSnackBar) {
    this.Math = Math;
  }

  ngOnInit() {
    this.spinner.show();
    this.lastUpdateAt = new Date().toLocaleString();
    setInterval(() => {
      this.currentTimestamp = new Date().toLocaleTimeString();
    }, 1000);
    this.currentDate = new Date().toDateString();
    this.getCurrentLocation();
  }

  getCurrentLocation() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.location = this.getCurrentLocationAddress(this.lat, this.lng);
        this.getWeatherInfo(this.lat, this.lng, 'current', this.location );
        this.getWeatherInfo(this.lat, this.lng, 'forcast', this.location );

      }, (e) => {
        alert(' Please Allow Location');
        this.weatherdataservice.getCurrentLocation().subscribe(data => {
          console.log(data);
          const loc = data.loc.split(',');
          const coords = {
              lat: loc[0],
              lon: loc[1]
          };
          if (coords.lat && coords.lon != null) {
          this.location = this.getCurrentLocationAddress(coords.lat, coords.lon);
          this.getWeatherInfo(coords.lat, coords.lon, 'current', this.location );
          this.getWeatherInfo(coords.lat, coords.lon, 'forcast', this.location );
          }

        }, error => {
          console.log(error);
          const snack = this.snackbar.open('Something went wrong', '', {
            duration: 1000,
            panelClass: ['red-snackbar']
          });
          this.spinner.hide();
        });
    }, {
        enableHighAccuracy: true
    });
  }
  }


  getCurrentLocationAddress(lat, lng) {
    return this.weatherdataservice.getCurrentLocationAddress(lat, lng).subscribe(data => {
        console.log(data);
        return this.location = data.results[0].locations[0].street + ', ' + data.results[0].locations[0].adminArea3 + ',' +
          data.results[0].locations[0].adminArea1;

      }, error => {
      console.log(error);
      this.spinner.hide();
    });
  }

  getWeatherInfo(lat, lng, type, location) {
    this.spinner.show();
    this.location = location;
    if (type === 'current') {
        this.weatherdataservice.getWeatherDataBylatLon(lat, lng, type).subscribe(data => {
        this.currentWeather = data;
        this.currentWeather.main.temp = this.Math.round( this.currentWeather.main.temp - 273);
        this.currentWeather.main.temp_min = this.Math.round( this.currentWeather.main.temp_min - 273);
        this.currentWeather.main.temp_max = this.Math.round( this.currentWeather.main.temp_max - 273);
        this.currentWeather.main.pressure = this.currentWeather.main.pressure * 0.0295301 ;
        this.spinner.hide();
      }, error => {
          console.log(error);
          const snack = this.snackbar.open('Something went wrong', '', {
            duration: 1000,
            panelClass: ['red-snackbar']
          });
          this.spinner.hide();
        });
    } else {
      this.spinner.show();
      this.weatherdataservice.getWeatherDataBylatLon(lat, lng, type).subscribe(data => {
        console.log(data);
        this.forecast = [];
        for (let i = 0; i < data.list.length; i = i + 8) {
        const forecastWeather = data.list[i];
        this.forecast.push(forecastWeather);
      }
        console.log('5 day', this.forecast);
        this.spinner.hide();
      }, error => {
          console.log(error);
          const snack = this.snackbar.open('Something went wrong', '', {
          duration: 1000,
          panelClass: ['red-snackbar']
        });
          this.spinner.hide();
        });
    }

  }



  receiveMessageFromHeaderNavbar($event) {
    this.spinner.show();
    console.log('from forcast', $event);
    this.lat = $event.lat;
    this.lng = $event.lng;
    this.city = $event.city;
    if ($event.weatherType === 'city' ) {
      this.weatherdataservice.getWeatherDataByCity(this.city, null, 'current' ).subscribe(data => {
        this.currentWeather = data;
        this.currentWeather.main.temp = this.Math.round( this.currentWeather.main.temp - 273);
        this.currentWeather.main.temp_min = this.Math.round( this.currentWeather.main.temp_min - 273);
        this.currentWeather.main.temp_max = this.Math.round( this.currentWeather.main.temp_max - 273);
        this.currentWeather.main.pressure = this.currentWeather.main.pressure * 0.0295301 ;
      });


      this.weatherdataservice.getWeatherDataByCity(this.city, null, 'forcast' ).subscribe(data => {
          console.log(data);
          this.forecast = [];
          for (let i = 0; i < data.list.length; i = i + 8) {
        const forecastWeather = data.list[i];
        forecastWeather.main.temp = this.Math.round( forecastWeather.main.temp - 273);
        forecastWeather.main.temp_min = this.Math.round( forecastWeather.main.temp_min - 273);
        forecastWeather.main.temp_max = this.Math.round( forecastWeather.main.temp_max - 273);
        forecastWeather.main.pressure = forecastWeather.main.temp_max * 0.0295301 ;

        console.log(forecastWeather);
        this.forecast.push(forecastWeather);
      }
          this.getCurrentLocationAddress( data.city.coord.lat, data.city.coord.lon);
          this.spinner.hide();
        }
      );
    } else {
      this.getWeatherInfo(this.lat, this.lng, 'forcast', $event.address );
      this.getWeatherInfo(this.lat, this.lng, 'current', $event.address );
    }
  }

  refreshData() {
    this.spinner.show();
    this.lastUpdateAt = new Date().toLocaleString();
    this.getWeatherInfo(this.lat, this.lng, 'current', this.location );
  }

  setWeatherDetail(weather) {
    this.spinner.show();
    console.log(weather);
    this.currentWeather = weather;
    setTimeout(() => {
    this.spinner.hide();
   }, 500);
  }
}
