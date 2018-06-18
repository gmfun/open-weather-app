import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherController } from './weather/weather.controller';
import { WeatherFetchService } from './weather-fetch.service';
import { DataStoreService } from './data-store.service';
import { ForecastController } from './forecast/forecast.controller';

@Module({
  imports: [],
  controllers: [WeatherController, ForecastController],
  providers: [AppService, WeatherFetchService, DataStoreService],
})
export class AppModule {}

