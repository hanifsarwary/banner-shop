# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from api.models import Product, Option, SubOption
from api.serializers.products import ProductSerializer, OptionSerializer, SubOptionSerializer


class ProductsListViewSet(ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects
    filter_backends = [DjangoFilterBackend, ]
    filterset_fields = ['is_featured', ]


class ProductOptionsListViewSet(ListAPIView):
    serializer_class = OptionSerializer
    queryset = Option.objects

    def list(self, request, product_id, *args, **kwargs):
        queryset = self.get_queryset().filter(product_id=product_id)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class SubProductOptionsListViewSet(ListAPIView):
    serializer_class = SubOptionSerializer
    queryset = SubOption.objects

    def list(self, request, product_id, option_id, *args, **kwargs):
        queryset = self.get_queryset().filter(option__product_id=product_id, option_id=option_id)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
