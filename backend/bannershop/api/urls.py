from django.urls import path

from api.views.products import ProductsListViewSet
from api.views.users import UsersListCreateViewSet, UsersDetailUpdateViewSet

urlpatterns = [
    path('products/', ProductsListViewSet.as_view()),
    path('users/', UsersListCreateViewSet.as_view()),
    path('users/<int:pk>/', UsersDetailUpdateViewSet.as_view())
]
