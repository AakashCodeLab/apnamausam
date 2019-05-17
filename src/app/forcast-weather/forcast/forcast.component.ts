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
    coord:{
      lon:null,
      lat:null},
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
        this.currentWeather.main.temp=this.Math.round( this.currentWeather.main.temp - 273);
        this.currentWeather.main.temp_min=this.Math.round( this.currentWeather.main.temp_min - 273);
        this.currentWeather.main.temp_max=this.Math.round( this.currentWeather.main.temp_max - 273);
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
        console.log('5 day', this.forecast);
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
        
          this.getCurrentLocation( data.city.coord.lat,data.city.coord.lon);
          this.currentWeather=data;
        }
      );
    } else {
      this.weatherdataservice.getWeatherDataBylatLon(this.lat, this.lng, 'forcast' ).subscribe(data => {
          console.log(data);
          this.getCurrentLocation(this.lat, this.lng);

          for (let i = 0; i < data.list.length; i = i + 8) {
          const forecastWeather = data.list[i];
          // console.log(forecastWeather);
          this.forecast.push(forecastWeather);
        }
          console.log( this.forecast);
        }
      );
    }
  }

  refreshData(){
    this.lastUpdateAt=new Date().toLocaleString();
    this.getCurrentWeatherInfo(this.lat, this.lng, 'current' );
  }

  setWeatherDetail(weather){
    console.log(weather);
    this.currentWeather=weather;
  }
}
