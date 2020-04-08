import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { Globals } from './globals';
import { LoginService } from './banner-admin/services/login.service';
import { SignupService } from './banner-admin/services/signup.service';
import { AuthGuard } from './shared';
import { ProductModelComponent } from './banner-admin/admin-components/products/product-model/product-model.component';
import { ProductDetailsComponent } from './banner-admin/admin-components/products/product-details/product-details.component';
import { OptionModelComponent } from './banner-admin/admin-components/option-groups/option-model/option-model.component';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: false,
        }),
    ],
    declarations: [AppComponent, ProductModelComponent, ProductDetailsComponent, OptionModelComponent],
    providers: [AuthGuard, Globals, LoginService, SignupService],
    bootstrap: [AppComponent]
})
export class AppModule {}
