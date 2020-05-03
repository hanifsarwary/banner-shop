import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannerAdminRoutingModule } from './banner-admin-routing.module';
import { BannerAdminComponent } from './banner-admin.component';
import { CategoriesComponent } from './admin-components/categories/categories.component';
import { HeaderComponent } from './admin-components/header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from './admin-components/sidebar/sidebar.component';
import { OptionGroupsComponent } from './admin-components/option-groups/option-groups.component';
import { ProductsComponent } from './admin-components/products/products.component';
import { UserAccountsComponent } from './admin-components/user-accounts/user-accounts.component';
import { CmsComponent } from './admin-components/cms/cms.component';
import { CustomOrdersComponent } from './admin-components/custom-orders/custom-orders.component';
import { OrderStatusComponent } from './admin-components/order-status/order-status.component';
import { PostCommentsComponent } from './admin-components/post-comments/post-comments.component';
import { ProfileComponent } from './admin-components/profile/profile.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './admin-components/dashboard/dashboard.component';
import { DatatableComponent } from './admin-components/datatable/datatable.component';
import { MatTableModule,
         MatPaginatorModule,
         MatSortModule,
         MatTooltipModule,
         MatButtonModule} from '@angular/material';
import { ModalAddCategoryComponent } from './admin-components/sub-components/modal-add-category/modal-add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PriceTypePipe } from '../custom-pipe/price-type.pipe';
import { OptionTypesPipe } from '../custom-pipe/option-types.pipe';
import { CdkTableModule } from '@angular/cdk/table';
import { CategoryDetailComponent } from './admin-components/categories/category-detail/category-detail.component';
import { UtilsFunction } from './utils-function';
import { OptionDetailComponent } from './admin-components/option-groups/option-detail/option-detail.component';
import { FiltersBarModule } from '../shared/filters-bar/filters-bar.module';
import { CustomersComponent } from './admin-components/customers/customers.component';
import { NgxsModule } from '@ngxs/store';
import { DateRangeState } from '../store/state';
import { InvoiceComponent } from './admin-components/invoice/invoice.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInsterceptorService } from './services/error-insterceptor.service';
import { PackingListComponent } from './admin-components/packing-list/packing-list.component';
@NgModule({
  declarations: [
    BannerAdminComponent,
    OptionDetailComponent,
    HeaderComponent,
    SidebarComponent,
    CategoriesComponent,
    OptionGroupsComponent,
    ProductsComponent,
    UserAccountsComponent,
    CmsComponent,
    CustomOrdersComponent,
    OrderStatusComponent,
    PostCommentsComponent,
    ProfileComponent,
    DashboardComponent,
    DatatableComponent,
    ModalAddCategoryComponent,
    CategoryDetailComponent,
    PriceTypePipe,
    OptionTypesPipe,
    CustomersComponent,
    InvoiceComponent,
    PackingListComponent
  ],
  imports: [
    CommonModule,
    CdkTableModule,
    NgxSpinnerModule,
    BannerAdminRoutingModule,
    TranslateModule,
    NgbDropdownModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    FiltersBarModule,
    MatTooltipModule,
    MatButtonModule,
    NgxsModule.forRoot([
      DateRangeState ])
  ],
  providers : [UtilsFunction,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInsterceptorService, multi: true }]
})
export class BannerAdminModule { }
