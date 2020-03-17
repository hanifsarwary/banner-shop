from rest_framework.views import APIView
from rest_framework.response import Response
from api.models import Product, SubOption

class CalculatePriceViewSet(APIView):

    def get(self, request, *args, **kwargs):
        print(request.query_params)
        queryset = SubOption.objects.filter(option__product__gte=1).select_related('option', 'option__product')
        print(queryset)
        return Response({"  vsbvkb": "kdhbsjbh"})