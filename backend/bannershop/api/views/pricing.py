from rest_framework.views import APIView
from rest_framework.response import Response
from api.models import Product, SubOption, Option, TwoDependentSubOption, ThreeDependentSubOption, Customer
from api.constants import *
import traceback

class CalculatePriceViewSet(APIView):

    def post(self, request, *args, **kwargs):
        try:
            product_id = request.data.get('product_id')
            product = Product.objects.filter(pk=product_id).first()
            option_queryset = Option.objects.filter(product=product)
            
            quantity = 0
            total_price = 0
            basic_price = 0
            one_time_charge = 0
            if request.data['options'].get('Proof'):
                one_time_charge = request.data['options'].pop('Proof')[1]
        
            if product.price_type == PRODUCT_PER_SQFT:
                quantity = request.data['options'].pop('Quantity', 1)
                basic_price = product.price_details['price'] * quantity * request.data.get('options').pop(
                    product.price_details['labels'][0], 1) * request.data.get('options').pop(
                        product.price_details['labels'][1])
            elif product.price_type == PRODUCT_VARIABLE_PER_QUANTITY:
                quantity = request.data['options'].pop('Quantity', 1)
                if product.price_details:
                    for k in product.price_details:
                        if quantity >= int(k.split('-')[0]) and quantity <= int(k.split('-')[1]):
                            basic_price = quantity * product.price_details.get(k)
                            break
            elif product.price_type == PRODUCT_FIXED_PER_QUANTITY:
                if type(request.data['options'].get('Quantity')) == list:
                    basic_price = request.data['options'].get('Quantity')[1]
                    quantity = int(request.data['options'].pop('Quantity')[0])
                else:
                    quantity = int(request.data['options'].pop('Quantity'))

            elif product.price_type == PRODUCT_TWO_OPTION:
                option_names = product.price_details.get('sequence')
                if type(request.data['options'].get('Quantity')) == list:
                    quantity = int(request.data['options'].get('Quantity')[0])
                else:
                    quantity = int(request.data['options'].get('Quantity'))
                basic_price = TwoDependentSubOption.objects.filter(product=product).filter(first_sub_option__option__option_name=option_names[0]).filter(
                    second_sub_option__option__option_name=option_names[1]).filter(
                        first_sub_option__name=request.data['options'].pop(option_names[0])[0]).filter(
                            second_sub_option__name=request.data['options'].pop(option_names[1])[0]
                        ).first().price
                if 'Quantity' not in option_names:
                    basic_price = basic_price * quantity
                    request.data['options'].pop('Quantity')
                
            elif product.price_type == PRODUCT_THREE_OPTION:

                option_names = product.price_details.get('sequence')
                if type(request.data['options'].get('Quantity')) == list:
                    quantity = int(request.data['options'].get('Quantity')[0])
                else:
                    quantity = int(request.data['options'].get('Quantity'))
                basic_price = ThreeDependentSubOption.objects.filter(first_sub_option__option__option_name=option_names[0]).filter(
                    second_sub_option__option__option_name=option_names[1]).filter(
                    third_sub_option__option__option_name=option_names[2]).filter(
                        first_sub_option__name=request.data['options'].pop(option_names[0])[0]).filter(
                            second_sub_option__name=request.data['options'].pop(option_names[1])[0]
                        ).filter(third_sub_option__name=request.data['options'].pop(option_names[2])[0]).first().price
                if 'Quantity' not in option_names:
                    basic_price = basic_price * quantity
                    request.data['options'].pop('Quantity')
            
            total_price = basic_price
            percentage_temp_arr = []
            basic_percentage_temp_arr = []
            multi_basic_arr = []
            for oq in option_queryset:
                if oq.option_type == OPTION_ACCUMULATIVE_PERCENTAGE and not oq.is_deleted:
                    if oq.is_suboptions:
                        if request.data.get('options').get(oq.option_name):
                            percentage_temp_arr.append(request.data.get('options').get(oq.option_name, [0, 0])[1])
                    else:
                        percentage_temp_arr.append(request.data.get('options').get(oq.option_name, 0))
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
                elif oq.option_type == OPTION_MULTIPLY_BASIC:
                    
                    if request.data.get('options').get(oq.option_name):
                        multi_basic_arr.append(request.data.get('options').get(oq.option_name))
                else:
                    if oq.is_suboptions:
                        if request.data.get('options').get(oq.option_name):
                            total_price = total_price + quantity * request.data.get('options').get(oq.option_name)[1]
                    else:
                        total_price = total_price + quantity * request.data.get('options').get(oq.option_name, 0)
               
            if basic_percentage_temp_arr and basic_percentage_temp_arr[0]:
                for i in basic_percentage_temp_arr:
                    total_price = total_price + basic_price * (i / 100)    
            for i in multi_basic_arr:
                total_price = total_price * i
            
            total_price = total_price + product.setup_cost + one_time_charge
            for i in percentage_temp_arr:
                total_price = total_price + total_price * (i / 100)  
            discount = None
            discount_percentage = 0
            if request.data.get('customer'):
                customer = Customer.objects.filter(id=request.data.get('customer')).first()
                if customer.discount_percentage > 0:
                    discount = total_price - (total_price * (customer.discount_percentage / 100))
                    discount = format(round(discount, 2), '.2f')
                    discount_percentage = customer.discount_percentage
            
            return Response({"price": format(round(total_price, 2), '.2f'), 
                             "discounted-price": discount, 'percentage': discount_percentage
            })
        except Exception as e:
            return Response({"price": 0, "error message": str(e), "trackback": traceback.format_exc()})