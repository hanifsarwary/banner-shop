from rest_framework.views import APIView
from rest_framework.response import Response
from api.models import Product, SubOption, Option
from api.constants import *

class CalculatePriceViewSet(APIView):

    def post(self, request, *args, **kwargs):
        
        product_id = request.data.get('product_id')
        product = Product.objects.filter(pk=product_id).first()
        option_queryset = Option.objects.filter(product=product)
        quantity = 0
        total_price = 0
        basic_price = 0
        
        if product.price_type == PRODUCT_PER_SQFT:
            quantity = request.data['options'].pop('Quantity')
            basic_price = product.price_details['price'] * quantity * request.data.get('options').pop('Width', 1) * request.data.get('options').pop('Height')
            total_price = basic_price + product.price_details.get('setup_cost', 0)
        elif product.price_type == PRODUCT_VARIABLE_PER_QUANTITY:
            quantity = request.data['options'].pop('Quantity')
            if product.price_details:
                for k in product.price_details:
                    if quantity >= int(k.split('-')[0]) and quantity <= int(k.split('-')[1]):
                        basic_price = quantity * product.price_details.get(k)
                        break
            total_price = basic_price
        print(total_price)
        percentage_temp_arr = []
        basic_percentage_temp_arr = []
        for oq in option_queryset:
            if oq.option_type == OPTION_ACCUMULATIVE_PERCENTAGE and not oq.is_deleted:
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

            elif oq.option_type == OPTION_BASIC_PERCENTAGE and not oq.is_deleted:
                if oq.is_suboptions:
                    if request.data.get('options').get(oq.option_name):
                        basic_percentage_temp_arr.append(request.data.get('options').get(oq.option_name, 1)[1])
                else:
                    basic_percentage_temp_arr.append(request.data.get('options').get(oq.option_name))

            else:
                if oq.is_suboptions:
                    if request.data.get('options').get(oq.option_name):
                        total_price = total_price + quantity * request.data.get('options').get(oq.option_name)[1]
                else:
                    total_price = total_price + quantity * request.data.get('options').get(oq.option_name, 0)
        print(total_price)
        for i in basic_percentage_temp_arr:
            total_price = total_price + basic_price * (i / 100)    
        for i in percentage_temp_arr:
            total_price = total_price + total_price * (i / 100)  
        print(total_price)   
        return Response({"price": total_price})