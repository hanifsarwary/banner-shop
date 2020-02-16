# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from api.serializers import UserSerializer
from rest_framework.permissions import IsAdminUser

class UserCreateView(CreateAPIView):

    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    