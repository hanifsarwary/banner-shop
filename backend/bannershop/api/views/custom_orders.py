from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView

from api.models import CustomOrder, Invoice, ProofHistory
from api.serializers.custom_orders import CustomOrderSerializer, InvoiceSerializer, ProofHistorySerializer


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


class ProofHistoryListView(ListCreateAPIView):
    queryset = ProofHistory.objects
    serializer_class = ProofHistorySerializer
    
    def list(self, request, custom_order_id, *args, **kwargs):
        queryset = self.get_queryset().filter(custom_order_id=custom_order_id).order_by('-created_at')
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)