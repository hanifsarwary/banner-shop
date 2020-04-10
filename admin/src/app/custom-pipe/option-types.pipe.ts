import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'optionTypes'
})
export class OptionTypesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let returnValue = '';
    let priceObj = localStorage.getItem('OptionPriceObj');
    priceObj = JSON.parse(priceObj);
    if (priceObj.hasOwnProperty(value)) {
      returnValue = priceObj[value];
    }
     return returnValue;
  }

}
