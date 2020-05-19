from rest_framework.generics import (
    ListCreateAPIView, ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView)

from cart.serializers.customer_shipping_details import ShippingDetailSerializer
from cart.models import CustomerShippingDetail


class ShippingListViewSet(ListCreateAPIView):

    serializer_class = ShippingDetailSerializer
    queryset = CustomerShippingDetail.objects.all()


class ShippingDetailViewSet(RetrieveUpdateDestroyAPIView):

    serializer_class = ShippingDetailSerializer
    queryset = CustomerShippingDetail.objects.all()