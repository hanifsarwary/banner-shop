import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, private global: Globals) { }

  getUsers(): Observable<any> {
    return this.httpClient.get<any>(`${this.global.users}`, { headers: this.global.httpHeaders() });
  }
}
