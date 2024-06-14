import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vndCurrency'
})
export class VNDCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined) return '';
    const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formattedValue + '₫';
  }
}
