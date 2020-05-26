# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.generics import ListCreateAPIView, ListAPIView, RetrieveUpdateAPIView
from rest_framework.response import Response

from api.models import Category
from api.serializers.categories import CategorySerializer, CategorySubCategoryProductSerializer


class CategoryListViewSet(ListCreateAPIView):
    """
    A view to get first level categories only
    """
    serializer_class = CategorySerializer
    queryset = Category.objects.filter(parent_category__isnull=True).order_by('id')


class AllCategoryListViewSet(ListAPIView):
    
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class SubCategoryListViewSet(ListAPIView):
    """
    A view to get sub categories of a category
    """
    serializer_class = CategorySerializer
    queryset = Category.objects.filter(parent_category__isnull=False)

    def list(self, request, category_id, *args, **kwargs):
        queryset = self.get_queryset().filter(parent_category_id=category_id)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class CategoryDetailViewSet(RetrieveUpdateAPIView):

    """
    A view to get details of a category
    """
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class CategorySubCategoryProductViewSet(ListAPIView):

    serializer_class = CategorySubCategoryProductSerializer
    queryset = Category.objects.filter(parent_category__isnull=True)