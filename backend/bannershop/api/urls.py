from django.urls import path

from api.views.categories import CategoryListViewSet, SubCategoryListViewSet
from api.views.custom_quotes import CustomQuoteViewSet
from api.views.customers import CustomerListViewSet
from api.views.products import ProductsListViewSet, ProductOptionsListViewSet, SubProductOptionsListViewSet
from api.views.users import UsersListCreateViewSet, UsersDetailUpdateViewSet

urlpatterns = [
    path('categories/', CategoryListViewSet.as_view()),
    path('categories/<int:category_id>/sub-categories/', SubCategoryListViewSet.as_view()),
    path('custom-quotes/', CustomQuoteViewSet.as_view()),
    path('customers/', CustomerListViewSet.as_view()),
    path('products/', ProductsListViewSet.as_view()),
    path('products/<int:product_id>/options/', ProductOptionsListViewSet.as_view()),
    path('products/<int:product_id>/options/<int:option_id>/sub-options', SubProductOptionsListViewSet.as_view()),
    path('users/', UsersListCreateViewSet.as_view()),
    path('users/<int:pk>/', UsersDetailUpdateViewSet.as_view())
]
