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
from django.db.models import Q

class OrderViewSet(ListAPIView):

    serializer_class = OrderRetrieveSerializer
    queryset = Order.objects.all().order_by('id')
    filter_backends = [DjangoFilterBackend, ]
    filterset_fields = ['is_cart', 'status'] 

    def filter_status(self, queryset, status):
        if status:
            queryset = queryset.filter(status=status)
        return queryset

    def filter_product_name(self, queryset, product_name):
        if product_name:
            queryset = queryset.filter(product__product_name__icontains=product_name)
        return queryset
    
    def filter_order_date(self, queryset, range_start, range_end):

        if range_start and range_end:
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
            queryset = queryset.filter(proof_status=proof)
        return queryset
    
    def filter_job_id(self, queryset, job_id):
        if job_id:
            queryset = queryset.filter(id=job_id)
        return queryset
    
    def filter_reference_number(self, queryset, reference_number):
        if reference_number:
            queryset = queryset.filter(reference_number__icontains=reference_number)
        return queryset

    def filter_company_name(self, queryset, company_name):
        if company_name:
            queryset = queryset.filter(customer__company_name__icontains=company_name)
        return queryset

    def filter_invoice_no(self, queryset, invoice_no):
        if invoice_no:
            queryset = queryset.filter(invoice_number=invoice_no)
        return queryset
    
    def filter_added_by(self, queryset, added_by):
        if added_by:
            user = User.objects.filter(username__icontains=added_by)
            if user:
                queryset = queryset.filter(customer__user__in=user.values('id'))
        return queryset

    def filter_job_name(self, queryset, job_name):
        if job_name:
            queryset = queryset.filter(job_name__icontains=job_name)
        return queryset

    # def filter_search(self, queryset, search_info):
    #     if search_info:
    #         queryset = queryset.filter(
    #             Q(product__product_name__icontains=search_info)| 
    #             Q(ink_color__icontains=search_info)
    #             )
    #     return queryset
    
    def filter_missing_deadline(self, queryset, missing_deadline):
        from datetime import date
        if missing_deadline:
            queryset = queryset.filter(due_date__lt=date.today()).exclude(status='Shipped')
        return queryset

    def filter_open_orders(self, queryset, is_open):
        if is_open:
            filter_arr = [i[0] for i in CustomOrder.STATUS_CHOICES[4:]]
            queryset = queryset.filter(status__in=filter_arr)
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
        # queryset = self.filter_search(queryset, self.request.data.get('search_info'))
        queryset = self.filter_missing_deadline(queryset, self.request.data.get('is_missing_deadline'))
        queryset = self.filter_open_orders(queryset, self.request.data.get('is_open'))
        
        return Response({"results": self.serializer_class(self.paginate_queryset(
            queryset.order_by('-id')), many=True).data})
    

class OrderCreateViewSet(APIView):

    def post(self, request):
        order_obj = OrderCreateSerializer().create(request.data)

        if order_obj:
            return Response({'result': order_obj.id}, status=HTTP_201_CREATED)
        else:
            return Response({'result': 0}, status=HTTP_400_BAD_REQUEST)

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