# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.generics import ListCreateAPIView, UpdateAPIView
from rest_framework.views import APIView
from api.models import Customer
from api.serializers.customers import CustomerSerializer, CustomerStatusUpdateSerializer
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

class CustomerListViewSet(ListCreateAPIView):
    
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all().order_by('-id')
    filter_backends = [DjangoFilterBackend, ]
    filterset_fields = ['status']
    

class CompanyNamesListView(APIView):

    def get(self, request):
        temp_arr = Customer.objects.filter(company_name__isnull=False).values_list('company_name')
        return_dict = dict()
        for t in temp_arr:
            return_dict[t[0]] = t[0]

        return Response({'names': return_dict})


class CustomerStatusViewSet(APIView):

    def get(self, request):

        return_dict = dict()
        for a, b in Customer.STATUS_CHOICES:
            return_dict.setdefault(a, b) 
        return Response({'types': return_dict})


class CustomerStatusUpdateViewSet(UpdateAPIView):

    serializer_class = CustomerStatusUpdateSerializer
    queryset = Customer.objects.all()