from rest_framework.generics import (
    ListCreateAPIView, ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView)
from cart.models import Order, OrderOption
from cart.serializers.orders import (
    OrderRetrieveSerializer, OrderCreateSerializer, OrderOptionBulkCreateSerializer)
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, DataAndFiles, JSONParser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.status import HTTP_400_BAD_REQUEST

class OrderViewSet(ListAPIView):

    serializer_class = OrderRetrieveSerializer
    queryset = Order.objects.all().order_by('-id')
    

class OrderCreateViewSet(CreateAPIView):

    serializer_class = OrderCreateSerializer
    queryset = Order.objects.all().order_by('-id')


class OrderDetailViewSet(RetrieveUpdateDestroyAPIView):

    serializer_class = OrderCreateSerializer
    queryset = Order.objects.all().order_by('-id')


class CreateOrderOptionsViewSet(CreateAPIView):

    serializer_class = OrderOptionBulkCreateSerializer
    queryset = OrderOption.objects.all()