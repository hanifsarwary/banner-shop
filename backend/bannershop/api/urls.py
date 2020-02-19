from django.urls import path
from api.views import UsersListCreateViewSet, UsersDetailUpdateViewSet

urlpatterns = [
    path('users/', UsersListCreateViewSet.as_view()),
    path('users/<int:pk>/', UsersDetailUpdateViewSet.as_view())

]