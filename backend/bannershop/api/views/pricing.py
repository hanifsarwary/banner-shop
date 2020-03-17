from rest_framework.views import APIView
from rest_framework.response import Response
from api.models import Product, SubOption, Option

class CalculatePriceViewSet(APIView):

    def post(self, request, *args, **kwargs):
        product_id = request.data.get('product_id', 1)
        product_name = request.data.get('product_name')
        option_queryset = Option.objects.filter(product=int(product_id))
        total_price = 0
        if str.lower(product_name) == 'indoor banners':
            for oq in option_queryset:
                if str.lower(oq.option_name) in ['turnaround', 'width', 'height']:
                    pass
                else:
                    total_price += request.data.get('options').get(oq.option_name)[1]
            total_price += request.data.get('options').get('height') * request.data.get('options').get('width') * 225
            total_price += (total_price * request.data.get('options').get('TurnAround')[1])
            total_price += 35
        return Response({'price': total_price})


                    

            





        return Response({"  vsbvkb": "kdhbsjbh"})