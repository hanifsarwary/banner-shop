import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private prices = new BehaviorSubject<any>({});
  private options = new BehaviorSubject<any>([]);
  priceTypes = this.prices.asObservable();
  optionTypes = this.options.asObservable();

  constructor() {}

  getPriceType(message: any) {
    this.prices.next(message);
  }

  getOptionType(message: any) {
    this.options.next(message);
  }
}
