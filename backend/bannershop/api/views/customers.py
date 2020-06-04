# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.generics import ListCreateAPIView, UpdateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from api.models import Customer
from api.serializers.customers import CustomerSerializer, CustomerStatusUpdateSerializer
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from api.views.custom_orders import CustomOrderListViewSet

class CustomerListViewSet(ListCreateAPIView):
    
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()
    filter_backends = [DjangoFilterBackend, ]
    filterset_fields = ['status']
  
    def filter_company_name(self, queryset, company_name):
        if company_name:
            queryset = queryset.filter(company_name__icontains=company_name)
        return queryset
    
    def filter_first_name(self, queryset, first_name):
        if first_name:
            queryset = queryset.filter(user__first_name__icontains=first_name)
        return queryset
    
    def filter_last_name(self, queryset, last_name):
        if last_name:
            queryset = queryset.filter(user__last_name__icontains=last_name)
        return queryset
    
    def filter_username(self, queryset, username):
        if username:
            queryset = queryset.filter(user__username__icontains=username)
        return queryset
    
    def filter_email(self, queryset, email):
        if email:
            queryset = queryset.filter(user__email__icontains=email)
        return queryset
    
    def filter_city(self, queryset, city):
        if city:
            queryset = queryset.filter(city__icontains=city)
        return queryset

    def post(self, request):
        queryset = CustomOrderListViewSet().filter_status(self.get_queryset(), request.data.get('status'))
        queryset = self.filter_company_name(queryset, self.request.data.get('company_name_search'))
        queryset = self.filter_first_name(queryset, self.request.data.get('first_name_search'))
        queryset = self.filter_last_name(queryset, self.request.data.get('last_name_search'))
        queryset = self.filter_username(queryset, self.request.data.get('username_search'))
        queryset = self.filter_email(queryset, self.request.data.get('email_search'))
        queryset = self.filter_company_name(queryset, self.request.data.get('city_search'))
        return Response({
            'results': self.serializer_class(queryset).data
        })
    

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


class CustomerStatusUpdateViewSet(RetrieveUpdateDestroyAPIView):

    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()


class CustomerRetriveUserIDViewSet(RetrieveUpdateDestroyAPIView):

    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()

    def get_object(self):
        
       return Customer.objects.get(user=self.kwargs.get('user_id', 1))
