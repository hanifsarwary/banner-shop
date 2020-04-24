import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  token: any;
  httpOptions = {};

  constructor() {}

  basic_url = 'http://34.68.49.20:8001';
  domanin_name = '/api';
  userSignup = `${this.domanin_name}/users/`;
  userLogin = `${this.domanin_name}/auth/token/obtain/`;
  categories = `${this.domanin_name}/categories/`;
  products = `${this.domanin_name}/products/`;
  options = `${this.domanin_name}/options/`;
  subOptions = `${this.domanin_name}/sub-options/`;
  optionsPriceTypes = `${this.domanin_name}/option-types/`;
  pricetType = `${this.domanin_name}/price-types/`;
  productsByCategory = `${this.domanin_name}/products/category/`;
  users = `${this.domanin_name}/users/`;
  customers = `${this.domanin_name}/customers/`;
  customOrders = `${this.domanin_name}/custom-orders/`;
  sendEmail = `${this.domanin_name}/send-custom-order-email/`;
  addCustomOrders = `${this.domanin_name}/custom-orders/create/`;
  invoices = `${this.domanin_name}/invoices/`;
  statusTypes = `${this.domanin_name}/custom-orders-types/`;

}
