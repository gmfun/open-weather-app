import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { AppRouterModule } from "./app-router.module";
import { HttpClientModule } from '@angular/common/http';
import { ForecastChartComponent } from './forecast-chart/forecast-chart.component';
import { WeatherImgPipe } from './weather-img.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailComponent,
    ForecastChartComponent,
    WeatherImgPipe
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
