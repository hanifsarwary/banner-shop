from cart.views.orders import (
    OrderViewSet, OrderCreateViewSet, OrderDetailViewSet, CreateOrderOptionsViewSet,
    ListOrderOptionsViewSet, OrderCheckOut, CustomerCartOrdersViewSet)

from cart.views.shippings import ShippingListViewSet, ShippingDetailViewSet
from django.urls import path, include

urlpatterns = [

    path('orders/', OrderViewSet.as_view()),
    path('orders/add/', OrderCreateViewSet.as_view()),
    path('orders/<int:pk>/', OrderDetailViewSet.as_view()),
    path('orders/customer/<int:customer_id>/', CustomerCartOrdersViewSet.as_view()),
    path('orders/order-options/create/', CreateOrderOptionsViewSet.as_view()),
    path('orders/order-options/<int:order_id>/', ListOrderOptionsViewSet.as_view()),
    path('orders/checkout/', OrderCheckOut.as_view()),
    path('customer/shippings/<int:customer_id>/', ShippingListViewSet.as_view()),
    path('shippings/<int:pk>/', ShippingDetailViewSet.as_view())
    
]