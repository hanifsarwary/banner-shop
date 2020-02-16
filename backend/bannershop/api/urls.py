from django.urls import path
from api.views import UserCreateView

urlpatterns = [
    path('user/create/', UserCreateView.as_view()),
]