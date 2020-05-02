import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { LoginService } from '../banner-admin/services/login.service';
import { AuthService } from '../banner-admin/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    wrongInfo = false;
    constructor(
      public router: Router, private loginService: LoginService, private auth: AuthService) {}

    ngOnInit() {
        if (this.auth.isAuthenticated) {
            this.router.navigate(['']);
        }
    }

    onSubmit(loginCredentials) {
        this.loginService.userLogin(loginCredentials).subscribe( res => {
            this.auth.storeToken(res.token);
            this.auth.storeUsername(loginCredentials.username);
            this.router.navigate(['']);
        }, err => {
            this.wrongInfo = true;
        });
    }
}
