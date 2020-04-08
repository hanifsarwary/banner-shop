import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  token: any;
  httpOptions = {};

  constructor() {}

  domanin_name = '/api';
  userSignup = `${this.domanin_name}/users/`;
  userLogin = `${this.domanin_name}/auth/token/obtain/`;
  categories = `${this.domanin_name}/categories/`;
  products = `${this.domanin_name}/products/`;
  options = `${this.domanin_name}/options/`;
  pricetType = `${this.domanin_name}/price-types/`;
  productsByCategory = `${this.domanin_name}/products/category/`;
}
