import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceHUF'
})
export class PriceHUFPipe implements PipeTransform {
  transform(price: number): string {
    return price.toString() + ' Ft';
  }
}
