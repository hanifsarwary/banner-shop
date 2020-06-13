from rest_framework.generics import (
    ListCreateAPIView, ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView)
from rest_framework.views import APIView
from cart.models import Order, OrderOption
from cart.serializers.orders import (
    OrderRetrieveSerializer, OrderCreateSerializer, OrderOptionBulkCreateSerializer, OrderOptionSerializer)
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, DataAndFiles, JSONParser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED
from django_filters.rest_framework import DjangoFilterBackend

class OrderViewSet(ListAPIView):

    serializer_class = OrderRetrieveSerializer
    queryset = Order.objects.all().order_by('id')
    filter_backends = [DjangoFilterBackend, ]
    filterset_fields = ['is_cart', 'status']    

class OrderCreateViewSet(CreateAPIView):

    serializer_class = OrderCreateSerializer
    queryset = Order.objects.all().order_by('-id')
        

class OrderDetailViewSet(RetrieveUpdateDestroyAPIView):

    serializer_class = OrderCreateSerializer
    queryset = Order.objects.all().order_by('-id')

    def retrieve(self, request, *args, **kwargs):
        obj = self.get_object()
        return Response(OrderRetrieveSerializer(obj).data)

class CreateOrderOptionsViewSet(CreateAPIView):

    serializer_class = OrderOptionBulkCreateSerializer
    queryset = OrderOption.objects.all()


class ListOrderOptionsViewSet(ListCreateAPIView):

    serializer_class = OrderOptionSerializer
    queryset = OrderOption.objects

    def list(self, request, order_id, *args, **kwargs):
        queryset = self.get_queryset().filter(order_id=order_id)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class OrderCheckOut(APIView):

    def post(self, request):
        cart_orders = Order.objects.filter(customer=request.data.get('customer'), 
                                           is_cart=True)
        cart_orders.update(is_cart=False, shipping_type=request.data.get('shipping'))
        return Response({'status': HTTP_201_CREATED})