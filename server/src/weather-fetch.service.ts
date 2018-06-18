import { Injectable } from '@nestjs/common';
import { from, Observable, zip} from "rxjs"
import axios from 'axios';

@Injectable()
export class WeatherFetchService {
    city = {
        "Bengaluru": 1277333,
        "Delhi": 1273294,
        "Mumbai": 1275339,
        "Kolkata": 1275004
    }
    key = '3e78242c3797c234b9257d7c8b6c3f87'
    getCities() {
        var cities$ = Object.keys(this.city).map((key) => this.getCity(this.city[key]))
        return zip(...cities$)
    };

    getCity(cityId: number): Observable<any> {
        return from(axios.get(this.weather(cityId)).then((data) => {
            return data.data
        }))
    };

    getForcast(cityId: number) {
        return from(axios.get(this.forcast(cityId)).then((data) => {
            return data.data
        }, (err) => {
            console.log("err", err)
        }))
    }

    forcast(cityId: number) {
        return `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${this.key}`
    }

    weather(cityId: number) {
        return `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${this.key}`
    }
}
