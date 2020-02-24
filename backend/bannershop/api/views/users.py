# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
from api.serializers.users import RetrieveUserSerializer
from django.contrib.auth.models import User


class UsersListCreateViewSet(ListCreateAPIView):
    serializer_class = RetrieveUserSerializer
    queryset = User.objects.all()


class UsersDetailUpdateViewSet(RetrieveUpdateAPIView):
    serializer_class = RetrieveUserSerializer

    def get_queryset(self):
        return User.objects.filter(id=self.kwargs['pk'])
