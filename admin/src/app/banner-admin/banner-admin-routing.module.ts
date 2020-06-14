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
import { InvoiceComponent } from './admin-components/invoice/invoice.component';
import { PackingListComponent } from './admin-components/packing-list/packing-list.component';
import { WorkOrderComponent } from './admin-components/work-order/work-order.component';
import { AllCustomersComponent } from './admin-components/all-customers/all-customers.component';
import { OrdersComponent } from './admin-components/orders/orders.component';
import { AuthGuard } from '../shared';
import { OrderDetailComponent } from './admin-components/orders/order-detail/order-detail.component';
import { AddOrderComponent } from './admin-components/orders/add-order/add-order.component';

const routes: Routes = [
    {
        path: '',
        component: BannerAdminComponent, canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: 'order-status', pathMatch: 'prefix' },
          { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
          { path: 'option-groups', component: OptionGroupsComponent, canActivate: [AuthGuard] },
          { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
          { path: 'product/:id', component: ProductDetailsComponent, canActivate: [AuthGuard] },
          { path: 'category/:id', component: CategoryDetailComponent, canActivate: [AuthGuard] },
          { path: 'option/:id', component: OptionDetailComponent, canActivate: [AuthGuard] },
          { path: 'invoice/:id', component: InvoiceComponent, canActivate: [AuthGuard] },
          { path: 'packing-list/:id', component: PackingListComponent, canActivate: [AuthGuard] },
          { path: 'user-accounts', component: UserAccountsComponent, canActivate: [AuthGuard] },
          { path: 'cms', component: CmsComponent, canActivate: [AuthGuard] },
          { path: 'custom-orders', component: CustomOrdersComponent, canActivate: [AuthGuard] },
          { path: 'update-custom-orders/:id/:operation', component: CustomOrdersComponent, canActivate: [AuthGuard] },
          { path: 'clone-custom-orders/:id/:operation', component: CustomOrdersComponent, canActivate: [AuthGuard]},
          { path: 'work-orders/:id', component: WorkOrderComponent, canActivate: [AuthGuard]},
          { path: 'order-status', component: OrderStatusComponent, canActivate: [AuthGuard] },
          { path: 'post-comments', component: PostCommentsComponent, canActivate: [AuthGuard] },
          { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
          { path: 'customers', component: AllCustomersComponent, canActivate: [AuthGuard] },
          { path: 'add-customer', component: CustomersComponent, canActivate: [AuthGuard] },
          { path: 'update-customer/:id/:operation', component: CustomersComponent, canActivate: [AuthGuard] },
          { path: 'shopping-cart-orders', component: OrdersComponent, canActivate: [AuthGuard] },
          { path: 'add-order', component: AddOrderComponent, canActivate: [AuthGuard] },
          { path: 'update-orders/:id/:operation', component: AddOrderComponent, canActivate: [AuthGuard] },
          { path: 'orders-detail/:id', component: OrderDetailComponent, canActivate: [AuthGuard] },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BannerAdminRoutingModule {}
