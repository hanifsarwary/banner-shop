from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView

from api.models import CustomOrder, Invoice
from api.serializers.custom_orders import CustomOrderSerializer, InvoiceSerializer


class CustomOrderListCreateViewSet(ListCreateAPIView):

    serializer_class = CustomOrderSerializer
    queryset = CustomOrder.objects


class CustomOrderDetailViewSet(RetrieveUpdateAPIView):

    serializer_class = CustomOrderSerializer
    queryset = CustomOrder.objects


class InvoiceListViewSet(ListCreateAPIView):

    serializer_class = InvoiceSerializer
    queryset = Invoice.objects



class InvoiceDetailViewSet(RetrieveUpdateAPIView):

    serializer_class = InvoiceSerializer
    queryset = Invoice.objects