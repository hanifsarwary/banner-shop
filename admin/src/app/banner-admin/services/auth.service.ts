import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private globals: Globals) {}

  public isAuthenticated(): boolean {
    return this.getToken() != null;
  }

  getToken(): Observable<any> {
    this.globals.token = localStorage.getItem('token');
    return this.globals.token;
  }

  storeToken(token) {
    localStorage.setItem('token', token);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('priceObj');
    localStorage.removeItem('OptionPriceObj');
  }

}
