from django.urls import path

from api.views.categories import CategoryListViewSet, SubCategoryListViewSet, CategoryDetailViewSet
from api.views.custom_quotes import CustomQuoteViewSet
from api.views.customers import CustomerListViewSet
from api.views.products import ProductsListViewSet, ProductOptionsListViewSet, SubProductOptionsListViewSet, CategoryProductsViewSet, ProductDetailViewSet
from api.views.users import UsersListCreateViewSet, UsersDetailUpdateViewSet
from api.views.contact_requests import ContactRequestViewSet, ContactRequestDetailViewSet
from api.views.orders import OrderViewSet, ProductOrderViewSet, ProductOrderOptionViewSet, ProductOrderOptionListViewSet

urlpatterns = [
    
    path('categories/', CategoryListViewSet.as_view()),
    path('categories/<int:pk>/', CategoryDetailViewSet.as_view()),
    path('categories/<int:category_id>/sub-categories/', SubCategoryListViewSet.as_view()),
    path('contact-requests/', ContactRequestViewSet.as_view()),
    path('contact-requests/<int:pk>/', ContactRequestDetailViewSet.as_view()),
    path('custom-quotes/', CustomQuoteViewSet.as_view()),
    path('customers/', CustomerListViewSet.as_view()),
    path('orders/', OrderViewSet.as_view()),
    path('product-orders/', ProductOrderViewSet.as_view()),
    path('product-orders/<int:product_order>/options/', ProductOrderOptionListViewSet.as_view()),
    path('product-order-options/', ProductOrderOptionViewSet.as_view()),
    path('products/', ProductsListViewSet.as_view()),
    path('products/<int:pk>/', ProductDetailViewSet.as_view()),
    path('products/category/<int:category_id>/', CategoryProductsViewSet.as_view()),
    path('products/<int:product_id>/options/', ProductOptionsListViewSet.as_view()),
    path('products/<int:product_id>/options/<int:option_id>/sub-options/', SubProductOptionsListViewSet.as_view()),
    path('users/', UsersListCreateViewSet.as_view()),
    path('users/<int:pk>/', UsersDetailUpdateViewSet.as_view())
]
