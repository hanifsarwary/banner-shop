from rest_framework.views import APIView
from rest_framework.response import Response


class CalculatePriceViewSet(APIView):

    def get(self, request, *args, **kwargs):
        print(request.query_params)
        return Response({"  vsbvkb": "kdhbsjbh"})