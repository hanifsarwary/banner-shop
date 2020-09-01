import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class Globals {
  token: any;
  httpOptions = {};

  constructor() {}

  basic_url = 'http://104.198.38.241:8001';
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
  allCustomers = `${this.domanin_name}/customers/filters/`;
  customOrders = `${this.domanin_name}/custom-orders/`;
  sendEmail = `${this.domanin_name}/send-custom-order-email/`;
  addCustomOrders = `${this.domanin_name}/custom-orders/create/`;
  invoices = `${this.domanin_name}/invoices/`;
  statusTypes = `${this.domanin_name}/custom-orders-types/`;
  statusProofTypes = `${this.domanin_name}/proof-status-types/`;
  companies = `${this.domanin_name}/customers/company-names/`;
  jobId = `${this.domanin_name}/get-latest-job-number/`;
  packingList = `${this.domanin_name}/packing-lists/`;
  boxesCreate = `${this.domanin_name}/boxes/bulk-create/`;
  boxesDelete = `${this.domanin_name}/boxes/`;
  customerStatus = `${this.domanin_name}/customer-status-types/`;
  proofApprovedDate = `${this.domanin_name}/custom-orders/proof-status/proof-approved_date/`;
  customerTypes = `${this.domanin_name}/customer-types/`;

  // Order

  cart_API_domain = '/cart-apis';
  allOrders = `${this.cart_API_domain}/orders/`;

  httpHeaders() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.token}`);
    return headers;
  }
}
