import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceType'
})
export class PriceTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let returnValue = '';
    let priceObj = localStorage.getItem('priceObj');
    priceObj = JSON.parse(priceObj);
    if (priceObj.hasOwnProperty(value)) {
      returnValue = priceObj[value];
    }
    console.log(returnValue);
     return returnValue;
  }

}
