from api.views.orders import OrderViewSet, ProductOrderViewSet, ProductOrderOptionViewSet, ProductOrderOptionListViewSet



    path('product-orders/', ProductOrderViewSet.as_view()),
    path('product-orders/<int:product_order>/options/', ProductOrderOptionListViewSet.as_view()),
    path('product-order-options/', ProductOrderOptionViewSet.as_view()),
    path('orders/', OrderViewSet.as_view()),