import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  constructor( private httpClient: HttpClient) { }
  weatherApiKey = '1ffd2cc61ace95f73895ce1b6b273190';
  weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/';
  units = 'Metric';

  getLatLngByZip(zipcode): Observable <any> {
  const  url = `https://geocode.xyz/${zipcode}?geoit=json&auth=711222908045781164814x2370`;
  return this.httpClient.get(url).map((response) => {
    return response;
  });
  }



  getCurrentLocation(lat, lng): Observable <any>{
    const  url = `https://open.mapquestapi.com/geocoding/v1/reverse?key=MAo53uOro51dvDPbucIxtZytlnb3AlD7&location=${lat},${lng}`;
    return this.httpClient.get(url).map((response) => {
      return response;
    });
  }

  getWeatherDataBylatLon(lat: any, lng: any, type: any): Observable <any> {
    let  url = '';
    if (type  === 'forcast') {
      // url=`https://api.darksky.net/forecast/24dfbe35483e5954d6da5665c468a40f/${latitude},${longitude}?units=ca`
      url = `${this.weatherBaseUrl}/forecast?lat=${lat}&lon=${lng}&appid=${this.weatherApiKey}&units=metric`;
    } else {
      url = `${this.weatherBaseUrl}/weather?lat=${lat}&lon=${lng}&appid=${this.weatherApiKey}`;
    }
    return this.httpClient.get(url).map((response: Response) => {
      return response;
    });
  }

// get weather information by city

  getWeatherDataByCity(city: string, country: string, type: any): Observable <any> {
    let  url = '';
    if (type  === 'forcast') {
      url = `${this.weatherBaseUrl}/forecast?q=${city}&&appid=${this.weatherApiKey}`;
     } else {
       url = `${this.weatherBaseUrl}/weather?q=${city}&&appid=${this.weatherApiKey}`;
         }
    return this.httpClient.get(url).map((response) => {
      return response;
    });
  }



}
