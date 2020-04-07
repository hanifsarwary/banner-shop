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

  deleteCategory(categoryId): Observable<any> {
    return this.httpClient.delete<any>(`${this.global.categories}${categoryId}`);
  }

  getProducts(param?): Observable<any> {
    param = param ? param : '';
    return this.httpClient.get<any>(`${this.global.products}${param}`);
  }

  getProductsByCategory(param?): Observable<any> {
    param = param ? param : '';
    return this.httpClient.get<any>(`${this.global.productsByCategory}${param}/`);
  }

  getOptions(param?): Observable<any> {
    param = param ? param : '';
    return this.httpClient.get<any>(`${this.global.options}${param}`);
  }

  deleteProduct(productId): Observable<any> {
    return this.httpClient.delete<any>(`${this.global.products}${productId}`);
  }


}
