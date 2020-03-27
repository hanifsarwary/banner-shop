import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  baseUrl = 'http://34.68.49.20:8001/api/';
  categories = `${this.baseUrl}categories/`;
}
