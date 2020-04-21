from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView

from api.models import CustomOrder, Invoice, ProofHistory
from api.serializers.custom_orders import CustomOrderSerializer, InvoiceSerializer, ProofHistorySerializer


class CustomOrderListCreateViewSet(ListCreateAPIView):

    serializer_class = CustomOrderSerializer

    def filter_status(queryset, status):
        if status:
            queryset = queryset.filter(status=status)
        return queryset

    def filter_product_name(queryset, product_name):
        if product_name:
            queryset = queryset.filter(custom_product_name__icontains=product_name)
        return queryset
        
    
    def get_queryset(self):

        queryset = self.filter_status(CustomOrder.objects.all(), self.request.query_params.get('status'))
        queryset = self.filter_product_name(queryset, self.request.query_params.get('product_name'))
        return queryset




class CustomOrderDetailViewSet(RetrieveUpdateAPIView):

    serializer_class = CustomOrderSerializer
    queryset = CustomOrder.objects.all()


class InvoiceListViewSet(ListCreateAPIView):

    serializer_class = InvoiceSerializer
    queryset = Invoice.objects.all()



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