import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/app/globals';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient, private globals: Globals) { }

  userSignUp(userObj) {
    return this.http.post<User>(`${this.globals.userSignup}`, userObj);
  }
}
