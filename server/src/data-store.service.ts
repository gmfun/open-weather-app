import { Injectable } from '@nestjs/common';
import { WeatherFetchService } from 'weather-fetch.service';
import { of, Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class DataStoreService {

    weatherStore = new DataStore(() => {
        return this.weather.getCities();
    });
    forecastData = new DataEntityStore((id) => {
        return this.weather.getForcast(id);
    })
    constructor(private weather: WeatherFetchService) {}

    getCitiesWeatherData() {
        return this.weatherStore.getData$();
    };

    getForecast(id) {
        return this.forecastData.getData$(id);
    }

};

class DataStore<T = any> {
    updatedAt: string;
    data: T;
    cacheDuration: number;
    fetchData$: (id?) => Observable<T>;

    constructor(fetchData$, cacheDuration?) {
        this.fetchData$ = fetchData$
        this.cacheDuration = cacheDuration || 3 * 60;
    }

    getData$(id?) {
        if (this.isValidData()) {
            console.log("cache")
            return of(this.data);
        } else {
            console.log("fetch")
            return this.fetchData$(id).pipe(
                tap((data) => {
                    this.data = data;
                    this.updatedAt = new Date().toISOString();
                })
            );
        }
    }
    isValidData() {
        return this.data && this.isNewData(this.updatedAt);
    };

    isNewData(time) {
        return this.updatedAt ? 
            new Date().getTime() - new Date(this.updatedAt).getTime() < this.cacheDuration * 1000 : true;
    }

};

class DataEntityStore<T = any> {
    entities: {[id: string]: DataStore} = {};
    fetchData$: (id) => Observable<T>;
    cacheDuration: number;

    constructor(fetchData$, cacheDuration?) {
        this.fetchData$ = fetchData$
        this.cacheDuration = cacheDuration || 3 * 60;
    }

    getData$(id) {
        if (this.entities[id]) {
            return this.entities[id].getData$(id)
        } else {
            this.entities[id] = this.getDataStore();
            return this.getData$(id);
        }
    }

    getDataStore() {
        return new DataStore((id) => this.fetchData$(id))
    }
}
