import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  constructor( private httpClient: HttpClient) { }
  appId = '1ffd2cc61ace95f73895ce1b6b273190';
  baseUrl = 'https://api.openweathermap.org/data/2.5/';
  units = 'Metric';

  getCurrentLocation(lat, lng): any {
    const  url = `https://open.mapquestapi.com/geocoding/v1/reverse?key=MAo53uOro51dvDPbucIxtZytlnb3AlD7&location=19.1107744,72.8456284`;
    return this.httpClient.get(url).map((response) => {
      return response;
    });
  }

  getWeatherDataBylatLon(lat: any, lng: any, type: any): Observable <any> {
    let  url = '';
    if (type  === 'forcast') {
      // url=`https://api.darksky.net/forecast/24dfbe35483e5954d6da5665c468a40f/${latitude},${longitude}?units=ca`
      url = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lng + '&appid=1ffd2cc61ace95f73895ce1b6b273190&units=metric';
    } else {
      url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng + '&appid=1ffd2cc61ace95f73895ce1b6b273190';
    }
    return this.httpClient.get(url).map((response: Response) => {
      return response;
    });
  }

// get weather information by city

  getWeatherDataByCity(city: string, country: string, type: any): Observable <any> {
    let  url = '';
    if (type  === 'forcast') {
      url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city  + '&&appid=1ffd2cc61ace95f73895ce1b6b273190';
     } else {
       url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&&appid=929e9b8b247fc56f5a7fb7b57172ea56';
         }
    return this.httpClient.get(url).map((response) => {
      return response;
    });
  }



}
