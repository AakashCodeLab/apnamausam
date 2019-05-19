 import { Component, OnInit } from '@angular/core';
import {WeatherDataService} from '../../services/weather-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  location:any;
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
      speed:null
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
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    this.weatherdataservice.getCurrentLocation().subscribe(data => {
        console.log(data);
        if(data.lat && data.lon!=null){
        this.location=this.getCurrentLocationAddress(data.lat,data.lon);
        this.getWeatherInfo(this.lat, this.lng, 'current', this.location );
        this.getWeatherInfo(this.lat, this.lng, 'forcast', this.location );
        }
      
      },error=>{
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            this.location=this.getCurrentLocationAddress(this.lat,this.lng);
            this.getWeatherInfo(this.lat, this.lng, 'current', this.location );
            this.getWeatherInfo(this.lat, this.lng, 'forcast', this.location );

          });
      }
    }
    );
  }


  getCurrentLocationAddress(lat, lng) {
    return this.weatherdataservice.getCurrentLocationAddress(lat, lng).subscribe(data => {
        console.log(data);
        return this.location = data.results[0].locations[0].street+', '+data.results[0].locations[0].adminArea3+','+data.results[0].locations[0].adminArea1;
       
      }
    );
  }

  getWeatherInfo(lat, lng, type, location) {
    this.location = location;
    if(type=='current')
    {
        this.weatherdataservice.getWeatherDataBylatLon(lat, lng, type).subscribe(data => {
        this.currentWeather = data;
        this.currentWeather.main.temp=this.Math.round( this.currentWeather.main.temp - 273);
        this.currentWeather.main.temp_min=this.Math.round( this.currentWeather.main.temp_min - 273);
        this.currentWeather.main.temp_max=this.Math.round( this.currentWeather.main.temp_max - 273);
        this.currentWeather.main.pressure= this.currentWeather.main.temp_max *0.0295301 ;

        console.log('current',this.currentWeather);
      }
    );
    }else
    {
      this.weatherdataservice.getWeatherDataBylatLon(lat, lng, type).subscribe(data => {
        console.log(data);
        this.forecast = [];
        for (let i = 0; i < data.list.length; i = i + 8) {
        const forecastWeather = data.list[i];
        console.log(forecastWeather);
        this.forecast.push(forecastWeather);
      }
        console.log('5 day', this.forecast);
      }
    );
    }
   
  }



  receiveMessage($event) {
    console.log('from forcast', $event);
    this.lat = $event.lat;
    this.lng = $event.lng;
    this.city = $event.city;
    if ($event.weatherType === 'city' ) {
      this.weatherdataservice.getWeatherDataByCity(this.city, null, 'forcast' ).subscribe(data => {
          console.log(data);
        
          this.getCurrentLocationAddress( data.city.coord.lat,data.city.coord.lon);
          this.currentWeather=data;
        }
      );
    } else {
      this.getWeatherInfo(this.lat, this.lng, 'forcast', $event.address );
    }
  }

  refreshData(){
    this.lastUpdateAt=new Date().toLocaleString();
    this.getWeatherInfo(this.lat, this.lng, 'current',this.location );
  }

  setWeatherDetail(weather){
    console.log(weather);
    this.currentWeather=weather;
  }
}
