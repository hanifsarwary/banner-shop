import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, private global: Globals) { }

  getCategories(param?: string): Observable<any> {
    param = param ? param : '';
    return this.httpClient.get<any>(`${this.global.categories}${param}`);
  }

  addCategory(dataObj): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Authorization', `token ${this.global.token}`);
    return this.httpClient.post<any>(this.global.categories, dataObj, { headers: headers });
  }

  addProduct(dataObj): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Authorization', `token ${this.global.token}`);

    return this.httpClient.post<any>(this.global.products, dataObj, { headers: headers });
  }

  updateProduct(id, dataObj): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Authorization', `token ${this.global.token}`);
    return this.httpClient.put<any>(`${this.global.products}${id}/`, dataObj, { headers: headers });
  }

  updateCategory(id, dataObj): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Authorization', `token ${this.global.token}`);
    return this.httpClient.put<any>(`${this.global.categories}${id}/`, dataObj, { headers: headers });
  }

  deleteCategory(categoryId): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    return this.httpClient.delete<any>(`${this.global.categories}${categoryId}`, { headers: headers });
  }

  getProducts(param?): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    param = param ? param : '';
    return this.httpClient.get<any>(`${this.global.products}${param}`, { headers: headers });
  }

  getPriceTypes() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    return this.httpClient.get<any>(`${this.global.pricetType}`, { headers: headers });
  }

  getProductsByCategory(param?): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    param = param ? param : '';
    return this.httpClient.get<any>(`${this.global.productsByCategory}${param}/`, { headers: headers });
  }

  getOptionsTypes(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    return this.httpClient.get<any>(`${this.global.optionsPriceTypes}`, { headers: headers });
  }

  getOptions(param?): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    param = param ? param : '';
    return this.httpClient.get<any>(`${this.global.options}${param}`, { headers: headers });
  }

  updateOptions(param, obj): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    param = param ? param : '';
    return this.httpClient.put<any>(`${this.global.options}${param}/`, obj, { headers: headers });
  }

  getSubCategory(param?): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    param = param ? param : '';
    return this.httpClient.get<any>(`${this.global.categories}${param}/sub-categories/`, { headers: headers });
  }

  getSubOption(param?): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    param = param ? param : '';
    return this.httpClient.get<any>(`${this.global.options}${param}/sub-options/`, { headers: headers });
  }

  addSubOption(param, obj): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    param = param ? param : '';
    return this.httpClient.post<any>(`${this.global.options}${param}/sub-options/`, obj, { headers: headers });
  }

  updateSubOption(param, obj): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    param = param ? param : '';
    return this.httpClient.put<any>(`${this.global.subOptions}${param}/`, obj, { headers: headers });
  }

  getOptionsByProduct(param?): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    param = param ? param : '';
    return this.httpClient.get<any>(`${this.global.products}${param}`, { headers: headers });
  }

  deleteProduct(productId): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    return this.httpClient.delete<any>(`${this.global.products}${productId}`, { headers: headers });
  }

  getUsers(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    return this.httpClient.get<any>(`${this.global.users}`, { headers: headers });
  }

  getCustomers(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    return this.httpClient.get<any>(`${this.global.customers}`, { headers: headers });
  }

  getCustomOrder(obj): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    return this.httpClient.post<any>(`${this.global.customOrders}`, obj, { headers: headers } );
  }

  addInvoices(obj): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    return this.httpClient.post<any>(`${this.global.invoices}`, obj, { headers: headers });
  }

  updateInvoices(id, obj): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    return this.httpClient.put<any>(`${this.global.invoices}${id}/`, obj, { headers: headers });
  }

  getInvoices(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    return this.httpClient.get<any>(`${this.global.invoices}`, { headers: headers });
  }

  getStatus(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    return this.httpClient.get<any>(`${this.global.statusTypes}`, { headers: headers });
  }

  getCompanies(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    return this.httpClient.get<any>(`${this.global.companies}`, { headers: headers });
  }

  getProofStatus(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    return this.httpClient.get<any>(`${this.global.statusProofTypes}`, { headers: headers });
  }

  addCustomOrder(obj): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    return this.httpClient.post<any>(`${this.global.addCustomOrders}`, obj, { headers: headers });
  }

  addCustomers(obj): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    return this.httpClient.post<any>(`${this.global.customers}`, obj, { headers: headers });
  }

  updateCustomOrder(id, obj): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    return this.httpClient.put<any>(`${this.global.customOrders}update/${id}/`, obj, { headers: headers });
  }

  sendEmailtoCustomer(obj): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    return this.httpClient.post<any>(`${this.global.sendEmail}`, obj, { headers: headers });
  }

  getCustomerOrderInvoice(id): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    return this.httpClient.get<any>(`${this.global.customOrders}${id}/invoice/`, { headers: headers });
  }

  updateInvoice(id, obj): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    return this.httpClient.put<any>(`${this.global.invoices}${id}`, obj, { headers: headers });
  }

  getProofHistory(id): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    return this.httpClient.get<any>(`${this.global.customOrders}/proof-history/${id}/`, { headers: headers });
  }
  updateProofStatus(id, obj): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `token ${this.global.token}`);
    return this.httpClient.patch<any>(`${this.global.customOrders}proof-status/update/${id}/`, obj, { headers: headers });
  }
}
