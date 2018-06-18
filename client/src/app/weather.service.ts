import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  weathers() {
    return this.http.get('http://localhost:3000/weather')
  };

  forecast(id): Observable<Forecast> {
    return this.http.get<Forecast>('http://localhost:3000/forecast/'+id);
  };

  imageUrl(code: string): string {
    return `http://openweathermap.org/img/w/${code}.png`
  }
};

export interface Forecast {
  cod: string;
  city: City;
  list: ForecastObject[];
}

export interface City {
  id: number,
  name: string,
  country: string,

}

export interface Main {
  temp: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Clouds {
  all: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Rain {
}

export interface Sys {
  pod: string;
}

export interface ForecastObject {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  rain: Rain;
  sys: Sys;
  dt_txt: string;
}

