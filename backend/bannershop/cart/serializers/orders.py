from rest_framework.serializers import ModelSerializer, Serializer
from rest_framework import serializers
from cart.models import Order, OrderOption
from api.serializers.customers import CustomerSerializer
from api.serializers.products import ProductSerializer
from api.serializers.products import OptionSerializer, SubOptionSerializer
from api.models import Customer

class OrderOptionSerializer(ModelSerializer):

    class Meta:
        model = OrderOption
        fields = '__all__'


class OrderOptionRetrieveSerializer(ModelSerializer):

    option = OptionSerializer()
    sub_option = SubOptionSerializer()

    class Meta:
        model = OrderOption
        fields = '__all__'


class OrderRetrieveSerializer(ModelSerializer):
    order_options = OrderOptionRetrieveSerializer(many=True)
    customer = CustomerSerializer()
    product = ProductSerializer()
    class Meta:
        model = Order
        fields = ('id', 'customer', 'product', 'special_note', 'due_date', 'invoice_number', 'internal_notes',
                  'image', 'proof_status', 'reference_number', 'status', 'quoted_price', 'shipping_type', 'is_cart',
                  'created_at', 'updated_at', 'order_options', 'job_name')



class OrderCreateSerializer(ModelSerializer):
    user = serializers.IntegerField()

    def create(self, validated_data):
        print(validated_data)
        customer = Customer.objects.filter(user=validated_data.pop('user')).first()
        validated_data['customer'] = customer
        print(validated_data)
        return Order.objects.create(**validated_data)
    
    class Meta:
        model = Order
        fields = ('id', 'customer', 'product', 'special_note', 'due_date', 'invoice_number', 'internal_notes',
                  'image', 'proof_status', 'reference_number', 'status', 'quoted_price', 'shipping_type', 'is_cart',
                  'job_name', 'user')


class OrderOptionBulkCreateSerializer(Serializer):

    order_options = OrderOptionSerializer(many=True)

    def create(self, validated_data):
        order_options_data = validated_data.pop('order_options')
        order_options_arr = []
        for _data in order_options_data:
            order_options_arr.append(
                OrderOption.objects.create(**_data))
        
        return {

            'order_options': order_options_arr
        }