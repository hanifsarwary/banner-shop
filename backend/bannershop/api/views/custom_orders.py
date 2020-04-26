from rest_framework.generics import ListCreateAPIView, RetrieveAPIView, ListAPIView, CreateAPIView, UpdateAPIView, RetrieveUpdateAPIView
from rest_framework.views import  APIView
from rest_framework.response import Response
from api.models import CustomOrder, Invoice, ProofHistory
from api.serializers.custom_orders import CustomOrderSerializer, InvoiceSerializer, ProofHistorySerializer, CustomOrderCreateSerializer


class CustomOrderListViewSet(ListAPIView):

    serializer_class = CustomOrderSerializer
    
    def get_queryset(Self):
        return CustomOrder.objects.all()
    
    def filter_status(self, queryset, status):
        if status:
            queryset = queryset.filter(status=status)
        return queryset

    def filter_product_name(self, queryset, product_name):
        if product_name:
            queryset = queryset.filter(custom_product_name__icontains=product_name)
        return queryset
    
    def filter_order_date(self, queryset, range_start, range_end):

        if range_start and range_end:
            queryset = queryset.filter(created_at__range=[range_start, range_end])
        return queryset
    
    def filter_due_date(self, queryset, range_start, range_end):

        if range_start and range_end:
            queryset = queryset.filter(due_date__range=[range_start, range_end])
        return queryset

    def filter_proof(self, queryset, proof):
        if proof:
            queryset = queryset.filter(custom_proof=proof)
        return queryset
    
    def filter_job_id(self, queryset, job_id):
        if job_id:
            queryset = queryset.filter(job_number=job_id)
        return queryset
    
    def filter_reference_number(self, queryset, reference_number):
        if reference_number:
            queryset = queryset.filter(reference_number=reference_number)
        return queryset

    def filter_company_name(self, queryset, company_name):
        if company_name:
            queryset = queryset.filter(customer__company_name=company_name)
        return queryset

    def filter_invoice_no(self, queryset, invoice_no):
        if invoice_no:
            queryset = queryset.filter(invoice__invoice_number=invoice_no)
        return queryset
    
    def filter_added_by(self, queryset, added_by):
        if added_by:
            queryset = queryset.filter(added_by__username=added_by)
        return queryset

    def post(self, request):

        queryset = self.filter_status(self.get_queryset(), self.request.data.get('status'))
        queryset = self.filter_product_name(queryset, self.request.data.get('product_name'))
        queryset = self.filter_due_date(queryset, self.request.data.get('due_date_start'), 
                                        self.request.data.get('due_date_end'))
        queryset = self.filter_order_date(queryset, self.request.data.get('order_date_start'), 
                                        self.request.data.get('order_date_end'))
        queryset = self.filter_proof(queryset, self.request.data.get('proof'))
        queryset = self.filter_job_id(queryset, self.request.data.get('job_id'))
        queryset = self.filter_reference_number(queryset, self.request.data.get('reference_number'))
        queryset = self.filter_invoice_no(queryset, self.request.data.get('invoice_no'))
        queryset = self.filter_added_by(queryset, self.request.data.get('placed_by'))
        queryset = self.filter_company_name(queryset, self.request.data.get('company'))
        
        return Response({"results": self.serializer_class(self.paginate_queryset(queryset), many=True).data})


class CustomOrderCreateViewSet(CreateAPIView):

    serializer_class = CustomOrderCreateSerializer
    queryset = CustomOrder.objects.all()


class CustomOrderDetailViewSet(RetrieveAPIView):

    serializer_class = CustomOrderSerializer
    queryset = CustomOrder.objects.all()


class CustomOrderInvoice(ListAPIView):

    serializer_class = InvoiceSerializer
    queryset = Invoice.objects.all()

    def list(self, request, custom_order_id, *args, **kwargs):
        queryset = self.get_queryset().filter(custom_order=custom_order_id)
        print(queryset)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

class CustomOrderUpdateViewSet(UpdateAPIView):

    serializer_class = CustomOrderCreateSerializer
    
    def get_queryset(self):
        return CustomOrder.objects.filter(pk=self.kwargs['pk'])

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


class GetOrderTypes(APIView):

    def get(self, request):
        return_dict = dict()
        for a, b in CustomOrder.STATUS_CHOICES: 
            return_dict.setdefault(a, b) 
        return Response({'types': return_dict})


class GetProofStatusTypes(APIView):

    def get(self, request):
        return_dict = dict()
        for a, b in CustomOrder.PROOF_STATUS_CHOICES: 
            return_dict.setdefault(a, b) 
        return Response({'types': return_dict})