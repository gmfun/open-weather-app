import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data$ = new Subject();
  data;
  constructor(public weatherService: WeatherService) { }

  ngOnInit() {
    this.weatherService.weathers().subscribe((data) => {
      console.log(data);
      this.data = data;
    });
  }

  imageUrl(code) {
    return this.weatherService.imageUrl(code);
  }

}
