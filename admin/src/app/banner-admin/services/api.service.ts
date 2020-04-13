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
    return this.httpClient.post<any>(this.global.categories, dataObj);
  }

  addProduct(dataObj): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.httpClient.post<any>(this.global.products, dataObj, { headers: headers });
  }

  updateProduct(id, dataObj): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.httpClient.put<any>(`${this.global.products}${id}/`, dataObj, { headers: headers });
  }

  updateCategory(id, dataObj): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.httpClient.put<any>(`${this.global.categories}${id}/`, dataObj, { headers: headers });
  }

  deleteCategory(categoryId): Observable<any> {
    return this.httpClient.delete<any>(`${this.global.categories}${categoryId}`);
  }

  getProducts(param?): Observable<any> {
    param = param ? param : '';
    return this.httpClient.get<any>(`${this.global.products}${param}`);
  }

  getPriceTypes() {
    return this.httpClient.get<any>(`${this.global.pricetType}`);
  }

  getProductsByCategory(param?): Observable<any> {
    param = param ? param : '';
    return this.httpClient.get<any>(`${this.global.productsByCategory}${param}/`);
  }

  getOptionsTypes(): Observable<any> {
    return this.httpClient.get<any>(`${this.global.optionsPriceTypes}`);
  }

  getOptions(param?): Observable<any> {
    param = param ? param : '';
    return this.httpClient.get<any>(`${this.global.options}${param}`);
  }

  updateOptions(param, obj): Observable<any> {
    param = param ? param : '';
    return this.httpClient.put<any>(`${this.global.options}${param}/`, obj);
  }

  getSubCategory(param?): Observable<any> {
    param = param ? param : '';
    return this.httpClient.get<any>(`${this.global.categories}${param}/sub-categories/`);
  }

  getSubOption(param?): Observable<any> {
    param = param ? param : '';
    return this.httpClient.get<any>(`${this.global.options}${param}/sub-options/`);
  }

  updateSubOption(param, obj): Observable<any> {
    param = param ? param : '';
    return this.httpClient.put<any>(`${this.global.subOptions}${param}/`, obj);
  }

  getOptionsByProduct(param?): Observable<any> {
    param = param ? param : '';
    return this.httpClient.get<any>(`${this.global.products}${param}`);
  }

  deleteProduct(productId): Observable<any> {
    return this.httpClient.delete<any>(`${this.global.products}${productId}`);
  }


}
