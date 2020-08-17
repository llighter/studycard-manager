import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'milisecToDate'
})
export class MilisecToDatePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return new Date(value);
  }

}
