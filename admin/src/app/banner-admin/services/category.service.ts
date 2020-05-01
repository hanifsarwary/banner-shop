import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from 'src/app/globals';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private httpClient: HttpClient,
    private global: Globals) { }

  getCategories(param?: string): Observable<any> {
    param = param ? param : '';
    return this.httpClient.get<any>(`${this.global.categories}${param}`, { headers: this.global.httpHeaders() });
  }

  addCategory(dataObj): Observable<any> {
    return this.httpClient.post<any>(this.global.categories, dataObj, { headers: this.global.httpHeaders()});
  }

  updateCategory(id, dataObj): Observable<any> {
    return this.httpClient.put<any>(`${this.global.categories}${id}/`, dataObj, { headers: this.global.httpHeaders()});
  }

  getSubCategory(param?): Observable<any> {
    param = param ? param : '';
    return this.httpClient.get<any>(`${this.global.categories}${param}/sub-categories/`, { headers: this.global.httpHeaders() });
  }

  deleteCategory(categoryId): Observable<any> {
    return this.httpClient.delete<any>(`${this.global.categories}${categoryId}`, { headers: this.global.httpHeaders()});
  }
}
