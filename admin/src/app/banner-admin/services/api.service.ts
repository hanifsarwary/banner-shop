import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, private global: GlobalService) { }

  getCategories(param?: string): Observable<any> {
    param = param ? param : '';
    return this.httpClient.get<any>(`${this.global.categories}${param}`);
  }

  addCategory(dataObj): Observable<any> {
    return this.httpClient.post<any>(this.global.categories, dataObj);
  }

  deleteCategory(categoryId): Observable<any> {
    return this.httpClient.delete<any>(`${this.global.categories}${categoryId}`);
  }



}
