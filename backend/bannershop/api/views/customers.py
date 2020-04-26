# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from api.models import Customer
from api.serializers.customers import CustomerSerializer
from rest_framework.response import Response

class CustomerListViewSet(ListCreateAPIView):
    
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all().order_by('-id')
    

class CompanyNamesListView(APIView):

    def get(self, request):

        return Response({'names': Customer.objects.filter(company_name__isnull=False).values_list('company_name')})