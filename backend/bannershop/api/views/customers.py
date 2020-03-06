# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.generics import ListCreateAPIView

from api.models import Customer
from api.serializers.customers import CustomerSerializer


class CustomerListViewSet(ListCreateAPIView):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all().order_by('-id')
