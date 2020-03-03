# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.generics import ListCreateAPIView

from api.models import CustomQuote
from api.serializers.custom_quotes import CustomQuoteSerializer


class CustomQuoteViewSet(ListCreateAPIView):
    serializer_class = CustomQuoteSerializer
    queryset = CustomQuote.objects.all().order_by('-id')
    