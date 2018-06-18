import { Component, OnInit } from '@angular/core';
import { WeatherService, Forecast } from '../weather.service';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  data$ = new Subject<Forecast>()
  constructor(private weather: WeatherService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.weather.forecast(this.route.snapshot.params['id']).subscribe(this.data$)
  }

}
