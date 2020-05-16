from cart.views.orders import OrderViewSet, OrderCreateViewSet, OrderDetailViewSet
from django.urls import path, include

urlpatterns = [

    path('orders/', OrderViewSet.as_view()),
    path('orders/add/', OrderCreateViewSet.as_view()),
    path('orders/<int:pk>/', OrderDetailViewSet.as_view()),
    
]