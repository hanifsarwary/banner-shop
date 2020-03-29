# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import ListCreateAPIView, ListAPIView, RetrieveUpdateAPIView
from rest_framework.response import Response

from api.models import Product, Option, SubOption
from api.serializers.products import ProductSerializer, OptionSerializer, SubOptionSerializer, ProductDetailSerializer


class ProductsListViewSet(ListCreateAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all().order_by('id')
    filter_backends = [DjangoFilterBackend, ]
    filterset_fields = ['is_featured', ]


class ProductOptionsListViewSet(ListCreateAPIView):
    serializer_class = OptionSerializer
    queryset = Option.objects

    def list(self, request, product_id, *args, **kwargs):
        queryset = self.get_queryset().filter(product_id=product_id, is_deleted=False).order_by('is_suboptions', 'option_name')
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class SubProductOptionsListViewSet(ListCreateAPIView):
    serializer_class = SubOptionSerializer
    queryset = SubOption.objects

    def list(self, request, product_id, option_id, *args, **kwargs):
        queryset = self.get_queryset().filter(option__product_id=product_id, option_id=option_id, is_deleted=False).order_by('price')
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class CategoryProductsViewSet(ListAPIView):

    serializer_class = ProductSerializer
    queryset = Product.objects

    def list(self, request, category_id, *args, **kwargs):
        queryset = self.get_queryset().filter(category=category_id)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class ProductDetailViewSet(RetrieveUpdateAPIView):
    
    serializer_class = ProductDetailSerializer
    queryset = Product.objects.all().order_by('id')