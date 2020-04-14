import { Pipe, PipeTransform } from '@angular/core';
import { SharedDataService } from '../banner-admin/services/shared-data.service';

@Pipe({
  name: 'optionTypes'
})
export class OptionTypesPipe implements PipeTransform {

  constructor(private data: SharedDataService) {}
  transform(value: any, args?: any): any {
    let returnValue = '';
    let priceObj = [];
    this.data.optionTypes.subscribe(message => {
      priceObj = message;
    });
    if (priceObj.hasOwnProperty(value)) {
      returnValue = priceObj[value];
    }
     return returnValue;
  }

}
