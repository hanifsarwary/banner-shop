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
                    option_data = request.data.get('options').get(oq.option_name)
                    if option_data:
                        total_price += option_data[1]
            total_price += request.data.get('options').get('height') * request.data.get('options').get('width') * 2.25
            total_price += (total_price * request.data.get('options').get('TurnAround')[1])
            total_price *= request.data.get('options').get('quantity', 1)
            total_price += 35

        elif str.lower(product_name) == 'outdoor banners':
            for oq in option_queryset:
                if str.lower(oq.option_name) in ['turnaround', 'width', 'height']:
                    pass
                else:
                    option_data = request.data.get('options').get(oq.option_name)
                    if option_data:
                        total_price += option_data[1]
            total_price += request.data.get('options').get('height') * request.data.get('options').get('width') * 2
            total_price += (total_price * request.data.get('options').get('TurnAround')[1])
            total_price *= request.data.get('options').get('quantity', 1)
            total_price += 35

        elif str.lower(product_name) == 'open house sign':
            quantity = request.data.get('options').get('quantity', 1)
            if quantity == 1:
                total_price +=75
            elif quantity <= 3:
                total_price = quantity * 70
            elif quantity <= 12:
                total_price = quantity * 65
            else:
                total_price = quantity * 55

            total_price += (total_price * request.data.get('options').get('TurnAround')[1])


        return Response({'price': total_price})


                    

            





        return Response({"  vsbvkb": "kdhbsjbh"})