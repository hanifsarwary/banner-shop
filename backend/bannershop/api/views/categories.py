# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.generics import ListAPIView
from rest_framework.response import Response

from api.models import Category
from api.serializers.categories import CategorySerializer


class CategoryListViewSet(ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.filter(parent_category__isnull=True).order_by('-id')


class SubCategoryListViewSet(ListAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.filter(parent_category__isnull=False)

    def list(self, request, category_id, *args, **kwargs):
        queryset = self.get_queryset().filter(parent_category_id=category_id)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
