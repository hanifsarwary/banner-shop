import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../banner-admin/services/signup.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    userExist = false;

    constructor(private router: Router, private formBuilder: FormBuilder, private signUpService: SignupService) {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
        this.registerForm.reset();
    }

    ngOnInit() {
    }

    get formValidator() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        } else {
            this.signUpService.userSignUp(this.registerForm.value).subscribe( res => {
                this.registerForm.reset();
                this.router.navigate(['/login']);
            }, err => {
                this.userExist = true;
            });
        }
    }
}
