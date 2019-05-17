import { Component, OnInit } from '@angular/core';
import {WeatherDataService} from '../../services/weather-service.service';

@Component({
  selector: 'app-forcast',
  templateUrl: './forcast.component.html',
  styleUrls: ['./forcast.component.css']
})
export class ForcastComponent implements OnInit {

  lat: any = 19.1726;
  lng: any = 72.9425;
  currentTimestamp;
  currentDate;
  lastUpdateAt;
  city = 'mumbai';
  location;
  Math: any;
  currentWeather = {
    name: null,
    main: {
      temp: null,
      temp_min:null,
      temp_max:null ,
      pressure:null,
      humidity:null
    },
    sys: {
      country: ''
    },
    weather: [{description: null,id:null,icon:null}],
    wind:{
      speed:''
    }
  };



  weatherdata1 = {
    name: null,
    main: {
      temp: null,
      pressure:null,
      humidity:null
    },
    sys: {
      country: ''
    },
    weather: [{description: null}],
    wind:{
      speed:''
    }
  };
  forecast = [];
  constructor(private weatherdataservice: WeatherDataService) {
    this.Math = Math;
  }

  ngOnInit() {
    this.lastUpdateAt=new Date().toLocaleString();
    setInterval(() => {      
      this.currentTimestamp=new Date().toLocaleTimeString();
    }, 1000);
    this.currentDate=new Date().toDateString();
console.log(this.currentDate)

   
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.getCurrentLocation(this.lat, this.lng);
        this.getCurrentWeatherInfo(this.lat, this.lng, 'current' );
        this.getForcastWeatherInfo(this.lat, this.lng, 'forcast' );
      });
    } else {
      this.getCurrentWeatherInfo(this.lat, this.lng, 'current' );
      this.getForcastWeatherInfo(this.lat, this.lng, 'forcast' );
    }
  }
  getCurrentLocation(lat, lng) {
    this.weatherdataservice.getCurrentLocation(lat, lng).subscribe(data => {
        console.log(data);
        this.location = data.results[0].locations[0].adminArea5;
      }
    );
  }

  getCurrentWeatherInfo(lat, lng, type) {
    this.weatherdataservice.getWeatherDataBylatLon(lat, lng, type).subscribe(data => {
        this.currentWeather = data;
        console.log('current',this.currentWeather);
      }
    );
  }




  getForcastWeatherInfo(lat, lng, type) {
    this.weatherdataservice.getWeatherDataBylatLon(lat, lng, 'forcast').subscribe(data => {
        console.log(data);


        for (let i = 0; i < data.list.length; i = i + 8) {
        const forecastWeather = data.list[i];
        // console.log(forecastWeather);
        this.forecast.push(forecastWeather);
      }
        console.log( this.forecast);
      }
    );
  }


  receiveMessage($event) {
    console.log('from forcast', $event);
    this.lat = $event.lat;
    this.lng = $event.lng;
    this.city = $event.city;
    if ($event.weatherType === 'city' ) {
      this.weatherdataservice.getWeatherDataByCity(this.city, null, 'forcast' ).subscribe(data => {
          console.log(data);
          this.weatherdata1 = data;
        }
      );
    } else {
      this.weatherdataservice.getWeatherDataBylatLon(this.lat, this.lng, 'forcast' ).subscribe(data => {
          console.log(data);
          this.weatherdata1 = data;

          for (let i = 0; i < data.list.length; i = i + 8) {
          const forecastWeather = data.list[i];
          // console.log(forecastWeather);
          this.forecast.push(forecastWeather);
        }
          console.log( this.forecast);
        }
      );
    }
/*https://github.com/FreeCodeCamp-SLC/weather-ng2/blob/master/src/app/forecast/forecast.component.ts*/

  }

  refreshData(){
    this.lastUpdateAt=new Date().toLocaleString();
    this.getCurrentWeatherInfo(this.lat, this.lng, 'current' );
  }
}
