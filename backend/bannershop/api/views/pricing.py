from rest_framework.views import APIView
from rest_framework.response import Response
from api.models import Product, SubOption, Option
from api.constants import *

class CalculatePriceViewSet(APIView):

    def post(self, request, *args, **kwargs):
        product_id = request.data.get('product_id', 1)
        product_name = request.data.get('product_name')
        product = Product.objects.filter(pk=product_id).first()
        option_queryset = Option.objects.filter(product=product)
        quantity = 0
        total_price = 0
        if product.price_type == PRODUCT_PER_SQFT:
            quantity = equest.data['options'].pop('Quantity')
            total_price = product.price_details['price'] * quantity * request.data.get('options').get('Width', 1) * request.data.get('options').get('Height')
            total_price = product.price_details.get('setup_cost', 0)
        elif product.price_type == PRODUCT_VARIABLE_PER_QUANTITY:
            quantity = request.data['options'].pop('Quantity')
            for k in product.price_details:
                if quantity >= int(k.split('-')[0]) and quantity <= int(k.split('-')[1]):
                    total_price = quantity * product.price_details.get(k)
                    break

        percentage_temp_arr = []
        for oq in option_queryset:
            if oq.option_type == OPTION_PERCENTAGE and not oq.is_deleted:
                if oq.is_suboptions:
                    if request.data.get('options').get(oq.option_name):
                        percentage_temp_arr.append(request.data.get('options').get(oq.option_name, 1)[1])
                else:
                    percentage_temp_arr.append(request.data.get('options').get(oq.option_name))
            elif oq.option_type == OPTION_FLAT_RATE and not oq.is_deleted:
                if oq.is_suboptions:
                    if request.data.get('options').get(oq.option_name):
                        total_price = total_price + request.data.get('options').get(oq.option_name)[1]
                else:
                    total_price = total_price + request.data.get('options').get(oq.option_name, 0)
            
            else:
                if oq.is_suboptions:
                    if request.data.get('options').get(oq.option_name):
                        total_price = total_price + quantity * request.data.get('options').get(oq.option_name)[1]
                else:
                    total_price = total_price + quantity * request.data.get('options').get(oq.option_name, 0)
        for i in percentage_temp_arr:
            total_price = total_price + total_price * (i / 100)     
        return Response({"price": total_price})