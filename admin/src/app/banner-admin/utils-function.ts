import { Injectable } from '@angular/core';
import { Globals } from '../globals';
@Injectable()
export class UtilsFunction {
    constructor(private global: Globals) { }

    getImage(imgUrl) {
      if (imgUrl !== null && imgUrl.includes('http')) {
        const pathname = new URL(imgUrl).pathname;
        return `${this.global.basic_url}${pathname}`;
      }
      return `${this.global.basic_url}${imgUrl}`;
    }
}
