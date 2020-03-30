import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  token: any;
  httpOptions = {};

  constructor() {}

  domanin_name = '/api';
  login_domain = '/auth';
  userSignup = `${this.domanin_name}/users/`;
  userLogin = `${this.login_domain}/token/obtain/`;
  categories = `${this.domanin_name}/categories/`;
  products = `${this.domanin_name}/products/`;
}
