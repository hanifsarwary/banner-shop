import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private httpClient: HttpClient,
    private global: Globals
  ) { }

  // Customer API's

  getCustomers(): Observable<any> {
    return this.httpClient.get<any>(`${this.global.customers}`, { headers: this.global.httpHeaders() });
  }

  addCustomers(obj): Observable<any> {
    return this.httpClient.post<any>(`${this.global.customers}`, obj, { headers: this.global.httpHeaders() });
  }

  // Custom Orders API's

  getCustomOrder(obj, param?): Observable<any> {
    param = param ? param : '';
    return this.httpClient.post<any>(`${this.global.customOrders}${param}`, obj, { headers: this.global.httpHeaders() } );
  }

  addCustomOrder(obj): Observable<any> {
    return this.httpClient.post<any>(`${this.global.addCustomOrders}`, obj, { headers: this.global.httpHeaders() });
  }

  updateCustomOrder(id, obj): Observable<any> {
    return this.httpClient.put<any>(`${this.global.customOrders}update/${id}/`, obj, { headers: this.global.httpHeaders() });
  }

  // Invoices API's

  getInvoices(): Observable<any> {
    return this.httpClient.get<any>(`${this.global.invoices}`, { headers: this.global.httpHeaders() });
  }

  addInvoices(obj): Observable<any> {
    return this.httpClient.post<any>(`${this.global.invoices}`, obj, { headers: this.global.httpHeaders() });
  }

  updateInvoices(id, obj): Observable<any> {
    return this.httpClient.put<any>(`${this.global.invoices}${id}/`, obj, { headers: this.global.httpHeaders() });
  }

  updateInvoice(id, obj): Observable<any> {
    return this.httpClient.put<any>(`${this.global.invoices}${id}`, obj, { headers: this.global.httpHeaders() });
  }

  getCustomerOrderInvoice(id): Observable<any> {
    return this.httpClient.get<any>(`${this.global.customOrders}${id}/invoice/`, { headers: this.global.httpHeaders() });
  }

  // Proof API's

  getProofHistory(id): Observable<any> {
    return this.httpClient.get<any>(`${this.global.customOrders}/proof-history/${id}/`, { headers: this.global.httpHeaders() });
  }

  updateProofStatus(id, obj): Observable<any> {
    return this.httpClient.patch<any>(`${this.global.customOrders}proof-status/update/${id}/`, obj, { headers: this.global.httpHeaders() });
  }

  // Customer Email API's

  sendEmailtoCustomer(obj): Observable<any> {
    return this.httpClient.post<any>(`${this.global.sendEmail}`, obj, { headers: this.global.httpHeaders() });
  }
  addPackingList(id, obj): Observable<any> {
    return this.httpClient.post<any>(`${this.global.customOrders}/packing-list/${id}/`, obj, { headers: this.global.httpHeaders() });
  }

}
