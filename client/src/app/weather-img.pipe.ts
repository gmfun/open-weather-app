import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherImg'
})
export class WeatherImgPipe implements PipeTransform {

  transform(value: any, args?: any): string {
    return `http://openweathermap.org/img/w/${value}.png`;
  }

}
