from rest_framework.generics import ListCreateAPIView, RetrieveAPIView, ListAPIView, CreateAPIView, UpdateAPIView, RetrieveUpdateAPIView
from rest_framework.views import  APIView
from rest_framework.response import Response
from api.models import CustomOrder, Invoice, ProofHistory
from api.serializers.custom_orders import (
    CustomOrderSerializer, InvoiceSerializer, ProofHistorySerializer, CustomOrderCreateSerializer,
    ProofStatusUpdateSerializer, CustomOrderUpdateSerializer)
from django.contrib.auth.models import User
from django.db.models import Q


class CustomOrderListViewSet(ListAPIView):

    serializer_class = CustomOrderSerializer
    
    def get_queryset(self):
        return CustomOrder.objects.all()
    
    def filter_status(self, queryset, status):
        if status:
            print('status:', status)
            queryset = queryset.filter(status=status)
        return queryset

    def filter_product_name(self, queryset, product_name):
        if product_name:
            print('product_name:', product_name)
            queryset = queryset.filter(custom_product_name__icontains=product_name)
        return queryset
    
    def filter_order_date(self, queryset, range_start, range_end):

        if range_start and range_end:
            print('order_date:', range_start)
            queryset = queryset.filter(created_at__range=[range_start, range_end])
        return queryset
    
    def filter_due_date(self, queryset, range_start, range_end):

        if range_start and range_end:
            queryset = queryset.filter(due_date__range=[range_start, range_end])
        elif range_start:
            queryset = queryset.filter(due_date=range_start)
        elif range_end:
            queryset = queryset.filter(due_date=range_end)
            
        return queryset

    def filter_proof(self, queryset, proof):
        if proof:
            print('proof:', proof)
            queryset = queryset.filter(custom_proof=proof)
        return queryset
    
    def filter_job_id(self, queryset, job_id):
        if job_id:
            print('job_id:', job_id)
            queryset = queryset.filter(id=job_id)
        return queryset
    
    def filter_reference_number(self, queryset, reference_number):
        if reference_number:
            print('reference:', reference_number)
            queryset = queryset.filter(reference_number__icontains=reference_number)
        return queryset

    def filter_company_name(self, queryset, company_name):
        if company_name:
            print('company_name:', company_name)
            queryset = queryset.filter(customer__company_name__icontains=company_name)
        return queryset

    def filter_invoice_no(self, queryset, invoice_no):
        if invoice_no:
            print('invoice:', invoice_no)
            queryset = queryset.filter(invoice__invoice_number=invoice_no)
        return queryset
    
    def filter_added_by(self, queryset, added_by):
        if added_by:
            print('added_by:', added_by)
            user = User.objects.filter(username__icontains=added_by)
            if user:
                queryset = queryset.filter(added_by__in=user.values('id'))
        return queryset

    def filter_job_name(self, queryset, job_name):
        if job_name:
            queryset = queryset.filter(custom_job_name__icontains=job_name)
        return queryset

    def filter_search(self, queryset, search_info):
        if search_info:
            print('search_info:', search_info)
            queryset = queryset.filter(
                Q(custom_product_name__icontains=search_info)| 
                Q(ink_color__icontains=search_info)
                )
        return queryset
    
    def filter_missing_deadline(self, queryset, missing_deadline):
        from datetime import date
        if missing_deadline:
            queryset = queryset.filter(due_date__lt=date.today()).exclude(status='Shipped')
        return queryset

    def filter_open_orders(self, queryset, is_open):
        if is_open:
            queryset = queryset.exclude(Q(status__in=CustomOrder.STATUS_CHOICES[4:]))
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
        queryset = self.filter_added_by(queryset, self.request.data.get('place_by'))
        queryset = self.filter_company_name(queryset, self.request.data.get('company'))
        queryset = self.filter_job_name(queryset, self.request.data.get('job_name'))
        queryset = self.filter_search(queryset, self.request.data.get('search_info'))
        queryset = self.filter_missing_deadline(queryset, self.request.data.get('is_missing_deadline'))
        queryset = self.filter_open_orders(queryset, self.request.data.get('is_open'))
        
        return Response({"results": self.serializer_class(self.paginate_queryset(
            queryset.order_by('-id')), many=True).data})


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

class CustomOrderUpdateViewSet(RetrieveUpdateAPIView):

    serializer_class = CustomOrderUpdateSerializer
    
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
        for a, b in tuple(reversed(CustomOrder.STATUS_CHOICES)): 
            return_dict.setdefault(a, b) 
        return Response({'types': return_dict})


class GetProofStatusTypes(APIView):

    def get(self, request):
        return_dict = dict()
        for a, b in CustomOrder.PROOF_STATUS_CHOICES: 
            return_dict.setdefault(a, b) 
        return Response({'types': return_dict})


class UpdateProofStatusViewSet(APIView):

    def patch(self, request, pk):
        custom_order = CustomOrder.objects.filter(pk=pk).update(proof_status=self.request.data.get('proof_status'))
        custom_order = CustomOrder.objects.filter(pk=pk).first()
        ProofHistory.objects.create(custom_order=custom_order, proof_status=self.request.data.get('proof_status'))
        
        return Response(CustomOrderCreateSerializer(custom_order).data)



class GetLatestJobNumber(APIView):

    def get(self, request):
        custom_order = CustomOrder.objects.all().order_by('-id').first()
        if custom_order:
            latest_number = custom_order.id + 1
        else:
            latest_number = 70000
        return Response({
            'number': latest_number
        })