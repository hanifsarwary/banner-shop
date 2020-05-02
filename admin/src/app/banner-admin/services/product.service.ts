import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from 'src/app/globals';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient: HttpClient,
    private global: Globals
    ) {}

  addProduct(dataObj): Observable<any> {
    return this.httpClient.post<any>(this.global.products, dataObj, { headers: this.global.httpHeaders() });
  }

  updateProduct(id, dataObj): Observable<any> {
    return this.httpClient.put<any>(`${this.global.products}${id}/`, dataObj, { headers: this.global.httpHeaders() });
  }

  getProducts(param?): Observable<any> {
    param = param ? param : '';
    return this.httpClient.get<any>(`${this.global.products}${param}`, { headers: this.global.httpHeaders() });
  }

  deleteProduct(productId): Observable<any> {

    return this.httpClient.delete<any>(`${this.global.products}${productId}`, { headers: this.global.httpHeaders() });
  }

  getOptionsByProduct(param?): Observable<any> {
    param = param ? param : '';
    return this.httpClient.get<any>(`${this.global.products}${param}`, { headers: this.global.httpHeaders() });
  }

  getProductsByCategory(param?): Observable<any> {
    param = param ? param : '';
    return this.httpClient.get<any>(`${this.global.productsByCategory}${param}/`, { headers: this.global.httpHeaders() });
  }

}
