# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
from api.serializers import CreateUserSerializer, RetrieveUserSerializer
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.contrib.auth.models import User

class UsersListCreateViewSet(ListCreateAPIView):

    serializer_class = RetrieveUserSerializer
    queryset = User.objects.all()


class UsersDetailUpdateViewSet(RetrieveUpdateAPIView):

    serializer_class = RetrieveUserSerializer
    
    def get_queryset(self):
        return User.objects.filter(id=self.kwargs['pk'])