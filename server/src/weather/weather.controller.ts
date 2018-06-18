import { Controller, Get } from '@nestjs/common';
import { WeatherFetchService } from 'weather-fetch.service';
import { DataStoreService } from 'data-store.service';

@Controller('weather')
export class WeatherController {
    constructor(
        private weather: WeatherFetchService,
        private store: DataStoreService
    ){};
    @Get()
    get() {
        return this.store.getCitiesWeatherData();
    }
}
