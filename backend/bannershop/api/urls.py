from django.urls import path

from api.views.categories import CategoryListViewSet, SubCategoryListViewSet
from api.views.products import ProductsListViewSet
from api.views.users import UsersListCreateViewSet, UsersDetailUpdateViewSet

urlpatterns = [
    path('categories/', CategoryListViewSet.as_view()),
    path('categories/<int:category_id>/sub-categories/', SubCategoryListViewSet.as_view()),
    path('products/', ProductsListViewSet.as_view()),
    path('users/', UsersListCreateViewSet.as_view()),
    path('users/<int:pk>/', UsersDetailUpdateViewSet.as_view())
]
