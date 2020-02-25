# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.generics import ListAPIView

from api.models import CustomQuote
from api.serializers.custom_quotes import CustomQuoteSerializer


class CustomQuoteViewSet(ListAPIView):
    serializer_class = CustomQuoteSerializer
    queryset = CustomQuote.objects
