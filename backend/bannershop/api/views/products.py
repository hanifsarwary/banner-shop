# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.generics import ListAPIView

from api.models import Product
from api.serializers.products import ProductsSerializer


class ProductsListViewSet(ListAPIView):
    serializer_class = ProductsSerializer
    queryset = Product.objects
