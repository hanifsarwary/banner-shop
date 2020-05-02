import { Injectable } from '@angular/core';
import { Globals } from '../globals';
@Injectable()
export class UtilsFunction {

  today = new Date();
  preMonth = new Date(this.today.getFullYear(), this.today.getMonth() - 1);
  nextMonth = this.today.setMonth(this.today.getMonth() + 1);

  constructor(private global: Globals) { }

  getImage(imgUrl) {
    if (imgUrl !== null && imgUrl.includes('http')) {
      const pathname = new URL(imgUrl).pathname;
      return `${this.global.basic_url}${pathname}`;
    }
    return `${this.global.basic_url}${imgUrl}`;
  }

}
