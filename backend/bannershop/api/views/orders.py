from rest_framework.generics import ListCreateAPIView
from api.models import Order, ProductOrder
from api.serializers.orders import OrderSerializer, ProductOrderSerializer


class OrderViewSet(ListCreateAPIView):

    serializer_class = OrderSerializer
    queryset = Order.objects.all().order_by('-id')



class ProductOrderViewSet(ListCreateAPIView):

    serializer_class = ProductOrderSerializer
    queryset = ProductOrder.objects.all().order_by('-id')