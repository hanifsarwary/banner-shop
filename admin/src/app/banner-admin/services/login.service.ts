import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private globals: Globals) { }

  userLogin(loginCredentials) {
    return this.http.post<any>(`${this.globals.userLogin}`, loginCredentials);
  }

  getUserInfo(username) {
    return this.http.get<any>(`${this.globals.userSignup}${username}`);
  }

}
