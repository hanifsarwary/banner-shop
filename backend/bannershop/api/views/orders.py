from rest_framework.generics import ListCreateAPIView, ListAPIView
from api.models import Order, ProductOrder, ProductOrderOption
from api.serializers.orders import OrderSerializer, ProductOrderSerializer, ProductOrderOptionSerializer
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, DataAndFiles, JSONParser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.status import HTTP_400_BAD_REQUEST
from django.http import QueryDict
import json

class OrderViewSet(ListCreateAPIView):

    class NestedMultipartParser(MultiPartParser):
 
        def parse(self, stream, media_type=None, parser_context=None):
            result = super().parse(stream=stream, media_type=media_type, parser_context=parser_context)
            data = {}
            qdict = QueryDict('', mutable=True)
            qdict.update(data)
            print(data)    
            return DataAndFiles(qdict, result.files)

    serializer_class = OrderSerializer
    queryset = Order.objects.all().order_by('-id')
    filter_backends = [DjangoFilterBackend, ]
    filterset_fields = ['order_number', 'status', 'start_date', 'customer_required_date']
    parser_classes = (NestedMultipartParser, )


class ProductOrderViewSet(ListCreateAPIView):

    serializer_class = ProductOrderSerializer
    queryset = ProductOrder.objects.all().order_by('-id')


class ProductOrderOptionViewSet(ListCreateAPIView):

    serializer_class = ProductOrderOptionSerializer
    queryset = ProductOrderOption.objects.all()


class ProductOrderOptionListViewSet(ListAPIView):

    serializer_class = ProductOrderOptionSerializer
    queryset = ProductOrderOption.objects.all()

    def list(self, request, product_order, *args, **kwargs):
        queryset = self.get_queryset().filter(product_order=product_order)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)