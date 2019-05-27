import { Component, OnInit } from '@angular/core';
import {WeatherDataService} from '../../services/weather-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import {MatSnackBar} from '@angular/material';
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
  currentDate;
  currentWeather = {
    coord: {
      lon: null,
      lat: null},
    name: null,
    main: {
      temp: null,
      temp_min: null,
      temp_max: null ,
      pressure: '',
      humidity: null
    },
    sys: {
      country: ''
    },
    weather: [{description: null, id: null, icon: null}],
    wind: {
      speed: ''
    }
  };
  hourlyWeather = [];
  constructor(private weatherdataservice: WeatherDataService, private spinner: NgxSpinnerService, private snackbar: MatSnackBar) {
    this.Math = Math;
  }
  period = 0;
  timeinterval;
  ngOnInit() {
    setInterval(() => {
      this.currentTimestamp = new Date().toLocaleTimeString();
    }, 1000);
    this.currentDate = new Date().toDateString();
    this.getCurrentLocation();

    setInterval(() => {
     if (this.period !== 0) {
        this.period = 0;
    } else {
        this.period = 1;
    }

    }, 1500);




  }
  getCurrentLocation() {
    this.spinner.show();
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.location = this.getCurrentLocationAddress(this.lat, this.lng);
        this.getWeatherInfo(this.lat, this.lng, 'current', this.location );
        this.getHourlyForcast(this.lat, this.lng, null, 'latlon');
      },  (e) => {
        confirm(' Please Allow Location');
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

  getWeatherInfo(lat, lng, type, location) {
    this.spinner.show();
    this.location = location;
    if (type === 'current') {
        this.weatherdataservice.getWeatherDataBylatLon(lat, lng, type).subscribe(data => {
        this.currentWeather = data;
        this.currentWeather.main.temp = this.Math.round( this.currentWeather.main.temp - 273);
        this.currentWeather.main.temp_min = this.Math.round( this.currentWeather.main.temp_min - 273);
        this.currentWeather.main.temp_max = this.Math.round( this.currentWeather.main.temp_max - 273);
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




  getCurrentLocationAddress(lat, lng) {
    return this.weatherdataservice.getCurrentLocationAddress(lat, lng).subscribe(data => {
        console.log(data);
        return this.location = data.results[0].locations[0].street + ', ' + data.results[0].locations[0].adminArea3 + ',' +
          data.results[0].locations[0].adminArea1;
      }, error => {
      console.log(error);
      const snack = this.snackbar.open('Something went wrong', '', {
        duration: 1000,
        panelClass: ['red-snackbar']
      });
      this.spinner.hide();
    });
  }
  getHourlyForcast(lat , lon, city, type: any ) {
    this.weatherdataservice.getHourlyForcast(lat , lon, city, type ).subscribe(data => {
      console.log('HourlyForcast', data);
      this.hourlyWeather = data.list.slice(0, 9);
      console.log('HourlyForcast', this.hourlyWeather);
      this.hourlyWeather.map((hoursdata) => {
        if (hoursdata.main.temp > 100) {
          hoursdata.main.temp = this.Math.round( hoursdata.main.temp - 273);
          hoursdata.main.temp_min = this.Math.round( hoursdata.main.temp_min - 273);
          hoursdata.main.temp_max = this.Math.round( hoursdata.main.temp_max - 273);
        }
        hoursdata.main.pressure = hoursdata.main.pressure * 0.0295301 ;
        hoursdata.dt_txt = this.formatAMPM(new Date(hoursdata.dt_txt));
       });
      console.log( this.hourlyWeather);

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

  receiveMessageFromHeaderNavbar($event) {
    this.spinner.show();
    console.log('from current', $event);
    this.lat = $event.lat;
    this.lng = $event.lng;
    this.city = $event.city;
    if ($event.weatherType === 'city' ) {
      this.getHourlyForcast(null, null, this.city, 'city');
      this.weatherdataservice.getWeatherDataByCity(this.city, null, 'current' ).subscribe(data => {
          console.log(data);
          this.spinner.hide();
          this.getCurrentLocationAddress( data.coord.lat, data.coord.lon);
          if (data.main.temp > 100) {
            data.main.temp = this.Math.round( data.main.temp - 273);
            data.main.temp_min = this.Math.round( data.main.temp_min - 273);
            data.main.temp_max = this.Math.round( data.main.temp_max - 273);
          }
          this.currentWeather = data;
        }, error => {
        console.log(error);
        const snack = this.snackbar.open('Something went wrong', '', {
          duration: 1000,
          panelClass: ['red-snackbar']
        });
        this.spinner.hide();
      });


    } else {
      this.getWeatherInfo(this.lat, this.lng, 'current', $event.address );
      this.getHourlyForcast(this.lat, this.lng, this.city, 'latlon');
    }
  }

  formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

}
