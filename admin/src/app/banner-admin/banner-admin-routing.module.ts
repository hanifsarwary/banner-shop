import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BannerAdminComponent } from './banner-admin.component';
import { DashboardComponent } from './admin-components/dashboard/dashboard.component';
import { CategoriesComponent } from './admin-components/categories/categories.component';
import { OptionGroupsComponent } from './admin-components/option-groups/option-groups.component';
import { ProductsComponent } from './admin-components/products/products.component';
import { UserAccountsComponent } from './admin-components/user-accounts/user-accounts.component';
import { CmsComponent } from './admin-components/cms/cms.component';
import { CustomOrdersComponent } from './admin-components/custom-orders/custom-orders.component';
import { OrderStatusComponent } from './admin-components/order-status/order-status.component';
import { PostCommentsComponent } from './admin-components/post-comments/post-comments.component';
import { ProfileComponent } from './admin-components/profile/profile.component';
import { ProductDetailsComponent } from './admin-components/products/product-details/product-details.component';
import { CategoryDetailComponent } from './admin-components/categories/category-detail/category-detail.component';
import { OptionDetailComponent } from './admin-components/option-groups/option-detail/option-detail.component';
import { CustomersComponent } from './admin-components/customers/customers.component';

const routes: Routes = [
    {
        path: '',
        component: BannerAdminComponent,
        children: [
          { path: '', redirectTo: 'order-status', pathMatch: 'prefix' },
          { path: 'categories', component: CategoriesComponent },
          { path: 'option-groups', component: OptionGroupsComponent },
          { path: 'products', component: ProductsComponent },
          { path: 'product/:id', component: ProductDetailsComponent },
          { path: 'category/:id', component: CategoryDetailComponent },
          { path: 'option/:id', component: OptionDetailComponent },
          { path: 'user-accounts', component: UserAccountsComponent },
          { path: 'cms', component: CmsComponent },
          { path: 'custom-orders', component: CustomOrdersComponent },
          { path: 'order-status', component: OrderStatusComponent },
          { path: 'post-comments', component: PostCommentsComponent },
          { path: 'profile', component: ProfileComponent },
          { path: 'customers', component: CustomersComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BannerAdminRoutingModule {}
