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

  getCustomers(param?): Observable<any> {
    const params = param ? param : '';
    return this.httpClient.get<any>(`${this.global.customers}${params}`, { headers: this.global.httpHeaders() });
  }

  updateCustomer(id, obj): Observable<any> {
    return this.httpClient.patch<any>(`${this.global.customers}${id}/`, obj, { headers: this.global.httpHeaders() });
  }

  updateCustomerStatus(id, obj): Observable<any> {
    return this.httpClient.patch<any>(`${this.global.customers}${id}/`, obj, { headers: this.global.httpHeaders() });
  }

  addCustomers(obj): Observable<any> {
    return this.httpClient.post<any>(`${this.global.customers}`, obj, { headers: this.global.httpHeaders() });
  }

  // Custom Orders API's

  getCustomOrder(obj): Observable<any> {
    return this.httpClient.post<any>(`${this.global.customOrders}`, obj, { headers: this.global.httpHeaders() } );
  }

  addCustomOrder(obj): Observable<any> {
    return this.httpClient.post<any>(`${this.global.addCustomOrders}`, obj, { headers: this.global.httpHeaders() });
  }

  updateCustomOrder(id, obj): Observable<any> {
    return this.httpClient.patch<any>(`${this.global.customOrders}update/${id}/`, obj, { headers: this.global.httpHeaders() });
  }

  deleteOrder(id): Observable<any> {
    return this.httpClient.delete<any>(`${this.global.customOrders}${id}/`, { headers: this.global.httpHeaders() } );
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

  updateOrderField(id, obj): Observable<any> {
    return this.httpClient.patch<any>(`${this.global.customOrders}update/${id}/`, obj, { headers: this.global.httpHeaders() });
  }

  // Customer Email API's

  sendEmailtoCustomer(obj): Observable<any> {
    return this.httpClient.post<any>(`${this.global.sendEmail}`, obj, { headers: this.global.httpHeaders() });
  }

  addPackingList(id, obj): Observable<any> {
    return this.httpClient.post<any>(`${this.global.customOrders}packing-list/${id}/`, obj, { headers: this.global.httpHeaders() });
  }

  updatePackingList(id, obj): Observable<any> {
    return this.httpClient.put<any>(`${this.global.packingList}${id}/update/`, obj, { headers: this.global.httpHeaders() });
  }

  createBoxesList(obj): Observable<any> {
    return this.httpClient.post<any>(`${this.global.boxesCreate}`, obj, { headers: this.global.httpHeaders() });
  }

  getJobId(): Observable<any> {
    return this.httpClient.get<any>(`${this.global.jobId}`, { headers: this.global.httpHeaders() });
  }

  getPackingList(id): Observable<any> {
    return this.httpClient.get<any>(`${this.global.customOrders}/packing-list/${id}/`, { headers: this.global.httpHeaders() });
  }

  deleteBoxes(id) {
    return this.httpClient.delete<any>(`${this.global.boxesDelete}${id}/`, { headers: this.global.httpHeaders() });
  }

  getCustomOrderById(id) {
    return this.httpClient.get<any>(`${this.global.customOrders}${id}/`, { headers: this.global.httpHeaders() });
  }

  getProofApprovedDate(id) {
    return this.httpClient.get<any>(`${this.global.proofApprovedDate}${id}/`, { headers: this.global.httpHeaders() });
  }

  getStatus() {
    return this.httpClient.get<any>(`${this.global.customerStatus}/`, { headers: this.global.httpHeaders() });
  }

  // Orders

  getAllOrder(): Observable<any> {
    return this.httpClient.get<any>(`${this.global.allOrders}`, { headers: this.global.httpHeaders() });
  }

}
