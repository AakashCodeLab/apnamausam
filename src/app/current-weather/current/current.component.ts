import { Component, OnInit } from '@angular/core';
import {WeatherDataService} from '../../services/weather-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {
  lat: any = 19.1726;
  lng: any = 72.9425;
  currentTimestamp;
  city = 'mumbai';
  Math: any;
  location;
  mapurl;
  currentWeather = {
    coord:{
      lon:null,
      lat:null},
    name: null,
    main: {
      temp: null,
      temp_min:null,
      temp_max:null ,
      pressure:'',
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

  constructor(private weatherdataservice: WeatherDataService) {
    this.Math = Math;
  }

  ngOnInit() {
    this.currentTimestamp=new Date().toLocaleTimeString();
    this.getCurrentLocation();
  }
  getCurrentLocation() {
    this.weatherdataservice.getCurrentLocation().subscribe(data => {
        console.log(data);
        if(data.lat && data.lon!=null){
        this.location=this.getCurrentLocationAddress(data.lat,data.lon);
        this.getWeatherInfo(data.lat, data.lon, 'current', this.location );
        }
      
      },error=>{
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            this.location=this.getCurrentLocationAddress(this.lat,this.lng);
            this.getWeatherInfo(this.lat, this.lng, 'current', this.location );
          });
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
        console.log('current',this.currentWeather);
      }
    );
    }
   
  }


  getCurrentLocationAddress(lat, lng) {
    return this.weatherdataservice.getCurrentLocationAddress(lat, lng).subscribe(data => {
        console.log(data);
        return this.location = data.results[0].locations[0].street+', '+data.results[0].locations[0].adminArea3+','+data.results[0].locations[0].adminArea1;
       
      }
    );
  }


  receiveMessage($event) {
    console.log('from current', $event);
    this.lat = $event.lat;
    this.lng = $event.lng;
    this.city = $event.city;
    if ($event.weatherType === 'city' ) {
      this.weatherdataservice.getWeatherDataByCity(this.city, null, 'current' ).subscribe(data => {
          console.log(data);
        
          this.getCurrentLocationAddress( data.city.coord.lat,data.city.coord.lon);
          this.currentWeather=data;
        }
      );
    } else {
      this.getWeatherInfo(this.lat, this.lng, 'current', $event.address );
    }
  }




}
