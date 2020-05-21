from rest_framework.generics import (
    ListCreateAPIView, ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView)

from cart.serializers.customer_shipping_details import ShippingDetailSerializer
from cart.models import CustomerShippingDetail
from rest_framework.response import Response

class ShippingListViewSet(ListCreateAPIView):

    serializer_class = ShippingDetailSerializer
    queryset = CustomerShippingDetail.objects.all()

    def list(self, request, customer_id, *args, **kwargs):
        queryset = self.get_queryset().filter(customer=pk)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

class ShippingDetailViewSet(RetrieveUpdateDestroyAPIView):

    serializer_class = ShippingDetailSerializer
    queryset = CustomerShippingDetail.objects.all()