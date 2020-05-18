import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from 'src/app/globals';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypesService {
  constructor(
    private httpClient: HttpClient,
    private global: Globals
    ) {}

  getPriceTypes() {
    return this.httpClient.get<any>(`${this.global.pricetType}`, { headers: this.global.httpHeaders() });
  }

  getOptionsTypes(): Observable<any> {
    return this.httpClient.get<any>(`${this.global.optionsPriceTypes}`, { headers: this.global.httpHeaders() });
  }

  getStatus(): Observable<any> {
    return this.httpClient.get<any>(`${this.global.statusTypes}`, {headers: this.global.httpHeaders() });
  }

  getProofStatus(): Observable<any> {
    return this.httpClient.get<any>(`${this.global.statusProofTypes}`, {headers: this.global.httpHeaders() });
  }

  getCompanies(): Observable<any> {
    return this.httpClient.get<any>(`${this.global.companies}`, {headers: this.global.httpHeaders() });
  }

}
