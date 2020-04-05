# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
from api.serializers.users import RetrieveUserSerializer, CreateUserSerializer
from django.contrib.auth.models import User


class UsersListCreateViewSet(ListCreateAPIView):
    serializer_class = CreateUserSerializer
    queryset = User.objects.all().order_by('-id')


class UsersDetailUpdateViewSet(RetrieveUpdateAPIView):
    serializer_class = RetrieveUserSerializer
    queryset = User.objects
