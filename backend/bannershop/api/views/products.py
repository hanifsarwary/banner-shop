# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.generics import ListCreateAPIView, ListAPIView, RetrieveUpdateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from api.models import Product, Option, SubOption
from api.serializers.products import ProductSerializer, OptionSerializer, SubOptionSerializer, ProductDetailSerializer
from django.db.models import Q

class ProductsListViewSet(ListCreateAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all().order_by('category')
    filter_backends = [DjangoFilterBackend, ]
    filterset_fields = ['is_featured', 'is_deleted', 'is_coupon_allowed', 'price_type']


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
        queryset = self.get_queryset().filter(Q(category=category_id) | Q(category__parent_category=category_id))
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class ProductDetailViewSet(RetrieveUpdateAPIView):
    
    serializer_class = ProductDetailSerializer
    queryset = Product.objects.all().order_by('id')


class OptionDetailViewSet(RetrieveUpdateAPIView):
    serializer_class = OptionSerializer
    queryset = Option.objects

class SubOptionDetailViewSet(RetrieveUpdateAPIView):
    serializer_class = SubOptionSerializer
    queryset = SubOption.objects


class AllOptionListView(ListAPIView):

    serializer_class = OptionSerializer
    queryset = Option.objects.all().order_by('product')



class GetProductPriceTypes(APIView):

    def get(self, request):
        return_dict = dict()
        for a, b in Product.PRICE_TYPES: 
            return_dict.setdefault(a, b) 
        
        return Response({ "types": return_dict})


class GetOptionTypes(APIView):

    def get(self, request):
        return_dict = dict()
        for a, b in Option.OPTION_TYPES: 
            return_dict.setdefault(a, []).append(b) 
        

        return Response({'types': return_dict})