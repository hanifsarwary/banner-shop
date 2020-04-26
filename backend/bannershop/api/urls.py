from django.urls import path

from api.views.categories import (
    CategoryListViewSet, SubCategoryListViewSet, CategoryDetailViewSet, CategorySubCategoryProductViewSet,
     AllCategoryListViewSet)
from api.views.custom_quotes import CustomQuoteViewSet
from api.views.customers import CustomerListViewSet
from api.views.products import (
    ProductsListViewSet, ProductOptionsListViewSet, SubProductOptionsListViewSet, CategoryProductsViewSet,
     ProductDetailViewSet, AllOptionListView, GetProductPriceTypes, GetOptionTypes, OptionDetailViewSet, 
     SubOptionDetailViewSet, OptionSubOptionsListViewSet)
from api.views.users import UsersListCreateViewSet, UsersDetailUpdateViewSet, UserDetailsWithUserName
from api.views.contact_requests import ContactRequestViewSet, ContactRequestDetailViewSet
from api.views.orders import OrderViewSet, ProductOrderViewSet, ProductOrderOptionViewSet, ProductOrderOptionListViewSet
from api.views.emails import SendOrderEmail
from api.views.pricing import CalculatePriceViewSet
from api.views.custom_orders import (
    CustomOrderListViewSet, CustomOrderDetailViewSet, InvoiceListViewSet, InvoiceDetailViewSet,
     ProofHistoryListView, GetOrderTypes, CustomOrderCreateViewSet,
      CustomOrderUpdateViewSet, CustomOrderInvoice)

from api.views.packing_lists import BoxesListViewSet, PackingListViewSet
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token

urlpatterns = [
    path('all-categories/', AllCategoryListViewSet.as_view()),
    path('categories/', CategoryListViewSet.as_view()),
    path('categories/<int:pk>/', CategoryDetailViewSet.as_view()),
    path('categories/<int:category_id>/sub-categories/', SubCategoryListViewSet.as_view()),
    path('category-subcategory-products/', CategorySubCategoryProductViewSet.as_view()),
    path('contact-requests/', ContactRequestViewSet.as_view()),
    path('contact-requests/<int:pk>/', ContactRequestDetailViewSet.as_view()),
    path('custom-quotes/', CustomQuoteViewSet.as_view()),
    path('custom-orders/', CustomOrderListViewSet.as_view()),
    path('custom-orders/create/', CustomOrderCreateViewSet.as_view()),
    path('custom-orders/<int:pk>/', CustomOrderDetailViewSet.as_view()),
    path('custom-orders/<int:custom_order_id>/invoice/', CustomOrderInvoice.as_view()),
    path('custom-orders/update/<int:pk>/', CustomOrderUpdateViewSet.as_view()),
    path('custom-orders-types/', GetOrderTypes.as_view()),
    path('custom-orders/proof-history/<int:custom_order_id>/', ProofHistoryListView.as_view()),
    path('custom-orders/packing-list/<int:custom_order_id>/', PackingListViewSet.as_view()),
    path('packing-lists/boxes/<int:packing_list_id>/', BoxesListViewSet.as_view()),
    path('customers/', CustomerListViewSet.as_view()),
    path('invoices/', InvoiceListViewSet.as_view()),
    path('invoices/<int:pk>/', InvoiceDetailViewSet.as_view()),
    path('send-custom-order-email/', SendOrderEmail.as_view()),
    path('orders/', OrderViewSet.as_view()),
    path('options/', AllOptionListView.as_view()),
    path('options/<int:pk>/', OptionDetailViewSet.as_view()),
    path('options/<int:option_id>/sub-options/', OptionSubOptionsListViewSet.as_view()),
    path('sub-options/<int:pk>/', SubOptionDetailViewSet.as_view()),
    path('price-types/', GetProductPriceTypes.as_view()),
    path('option-types/', GetOptionTypes.as_view()),
    path('prices/', CalculatePriceViewSet.as_view()),
    path('product-orders/', ProductOrderViewSet.as_view()),
    path('product-orders/<int:product_order>/options/', ProductOrderOptionListViewSet.as_view()),
    path('product-order-options/', ProductOrderOptionViewSet.as_view()),
    path('products/', ProductsListViewSet.as_view()),
    path('products/<int:pk>/', ProductDetailViewSet.as_view()),
    path('products/category/<int:category_id>/', CategoryProductsViewSet.as_view()),
    path('products/<int:product_id>/options/', ProductOptionsListViewSet.as_view()),
    path('products/<int:product_id>/options/<int:option_id>/sub-options/', SubProductOptionsListViewSet.as_view()),
    path('users/', UsersListCreateViewSet.as_view()),
    path('users/<int:pk>/', UsersDetailUpdateViewSet.as_view()),
    path('users/<str:username>/', UserDetailsWithUserName.as_view()),
    path('auth/token/obtain/', obtain_jwt_token),
    path('auth/token/refresh/', refresh_jwt_token),
    path('auth/token/verify/', verify_jwt_token),
]