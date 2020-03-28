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
import { MatTableModule, MatPaginatorModule, MatSortModule, MatTableDataSource } from '@angular/material';
import { ModalAddCategoryComponent } from './admin-components/sub-components/modal-add-category/modal-add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BannerAdminComponent,
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
    ModalAddCategoryComponent
  ],
  imports: [
    CommonModule,
    BannerAdminRoutingModule,
    TranslateModule,
    NgbDropdownModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BannerAdminModule { }