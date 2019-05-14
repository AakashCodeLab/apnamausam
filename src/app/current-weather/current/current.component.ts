import { Component, OnInit } from '@angular/core';
import {WeatherDataService} from '../../services/weather-service.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {
  lat: any = 19.1726;
  lng: any = 72.9425;
  city = 'mumbai';
  Math: any;
  location;
  mapurl;
  weatherdata1 = {
    name: null,
    main: {
      temp: '',
    },
    sys: {
      country: ''
    },
    weather: [{description: ''}]
  };

  constructor(private weatherdataservice: WeatherDataService) {
    this.Math = Math;
  }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.getCurrentLocation(this.lat, this.lng);
        this.getCurrentWeatherInfo(this.lat, this.lng, 'current' );
      });
    } else {
      this.getCurrentWeatherInfo(this.lat, this.lng, 'current' );
    }
  }
  getCurrentLocation(lat, lng) {
    this.weatherdataservice.getCurrentLocation(lat, lng).subscribe(data => {
        console.log(data);
        this.location = data.results[0].locations[0].adminArea5;
        this.mapurl = data.results[0].locations[0].mapUrl;
      }
    );
  }

  getCurrentWeatherInfo(lat, lng, type) {
    this.weatherdataservice.getWeatherDataBylatLon(lat, lng, type).subscribe(data => {
        console.log(data);
        this.weatherdata1 = data;
      }
    );
  }
  receiveMessage($event) {
    console.log('from current', $event);
    this.lat = $event.lat;
    this.lng = $event.lng;
    this.city = $event.city;
    if ( $event.weatherType === 'city' ) {
      this.weatherdataservice.getWeatherDataByCity(this.city, null, 'current' ).subscribe(data => {
          console.log(data);
          this.weatherdata1 = data;
        }
      );
    } else {
      this.weatherdataservice.getWeatherDataBylatLon(this.lat, this.lng, 'current' ).subscribe(data => {
          console.log(data);
          this.weatherdata1 = data;
        }
      );
    }

  }



}
