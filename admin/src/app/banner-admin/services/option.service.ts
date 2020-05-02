import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from 'src/app/globals';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  constructor(
    private httpClient: HttpClient,
    private global: Globals) { }

    getOptions(param?): Observable<any> {
      param = param ? param : '';
      return this.httpClient.get<any>(`${this.global.options}${param}`, { headers: this.global.httpHeaders() });
    }

    updateOptions(param, obj): Observable<any> {
      param = param ? param : '';
      return this.httpClient.put<any>(`${this.global.options}${param}/`, obj, { headers: this.global.httpHeaders() });
    }

    getSubOption(param?): Observable<any> {
      param = param ? param : '';
      return this.httpClient.get<any>(`${this.global.options}${param}/sub-options/`, { headers: this.global.httpHeaders() });
    }

    addSubOption(param, obj): Observable<any> {
      param = param ? param : '';
      return this.httpClient.post<any>(`${this.global.options}${param}/sub-options/`, obj, { headers: this.global.httpHeaders() });
    }

    updateSubOption(param, obj): Observable<any> {
      param = param ? param : '';
      return this.httpClient.put<any>(`${this.global.subOptions}${param}/`, obj, { headers: this.global.httpHeaders() });
    }
}
