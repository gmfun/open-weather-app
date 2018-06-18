import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { Forecast } from '../weather.service';
import {Chart} from 'frappe-charts/dist/frappe-charts.esm';
import { getHours, format } from "date-fns";

@Component({
  selector: 'app-forecast-chart',
  templateUrl: './forecast-chart.component.html',
  styleUrls: ['./forecast-chart.component.scss']
})
export class ForecastChartComponent implements OnInit, OnChanges {
  @Input() data: Forecast;
  @ViewChild('chart') chart: ElementRef;
  graphData;
  
  constructor() { }

  ngOnInit() {
    // console.log(Chart);
  }

  ngOnChanges() {
    if (this.data) {
      this.graphData = this.getGraphData(this.data);
      const chart = new Chart(this.chart.nativeElement, this.graphData);
    }
  };

  getGraphData(data: Forecast) {
    const list = data.list;
    const labels = list.map((item) => {
      // console.log(item.dt, item.dt_txt, getHours(new Date(item.dt * 1000)), new Date(item.dt * 1000).toDateString())
      return format(new Date(item.dt * 1000), 'h:m a, D ddd MMM');
    });
    const datasets = [
      {
        name: "Temparature",
        type: "line",
        values:  list.map((item) => {
          return Math.round(item.main.temp - 273);
        })
      },
      {
        name: "Max Temparature",
        type: "line",
        values:  list.map((item) => {
          return Math.round(item.main.temp_max - 273);
        })
      },
      {
        name: "Min Temparature",
        type: "line",
        values:  list.map((item) => {
          return Math.round(item.main.temp_min - 273);
        })
      }
    ];

    return { // or DOM element
      data: {
        labels,
    
        datasets,
    
    
      },
  
      title: this.data.city.name,
      type: 'axis-mixed', // or 'bar', 'line', 'pie', 'percentage'
      height: 300,
      colors: ['purple', '#ffa3ef', 'light-blue'],
  
      axisOptions: {
        // yAxisMode: 'span',   // Axis lines, default
        // xAxisMode: 'tick',   // No axis lines, only short ticks
        xIsSeries: 1         // Allow skipping x values for space
                             // default: 0
      },
  
      tooltipOptions: {
        formatTooltipX: d => (d),
        formatTooltipY: d => {
          return d + ' C'
        },
      }
    }
  }

}
