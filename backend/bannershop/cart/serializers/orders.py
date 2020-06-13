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



class OrderCreateSerializer(Serializer):
    user = serializers.IntegerField()
    customer = serializers.IntegerField(null=True, blank=True)
    product = serializers.IntegerField()
    special_note = serializers.CharField(null=True, blank=True)
    due_date = serializers.DateField(null=True, blank=True, db_index=True)
    invoice_number = serializers.CharField(max_length=256, null=True, blank=True)
    internal_notes = serializers.CharField(null=True, blank=True)
    image = serializers.FileField(null=True, blank=True, upload_to='images/cart-images/')
    job_name = serializers.CharField(default=' ', max_length=256)
    proof_status = serializers.ChoiceField(max_length=32, choices=Order.PROOF_STATUS_CHOICES)
    reference_number = serializers.CharField(max_length=256, null=True, blank=True, db_index=True)
    status = serializers.ChoiceField(choices=Order.STATUS_CHOICES, max_length=64, db_index=True)
    quoted_price = serializers.FloatField(null=True)
    shipping_type = serializers.ChoiceField(max_length=64, 
                                     choices=Order.SHIPPING_TYPE_CHOICES, null=True, blank=True)

    is_cart = serializers.BooleanField(default=True)
    created_at = serializers.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = serializers.DateTimeField(auto_now=True, null=True, blank=True)

    
    def create(self, validated_data):
        print(validated_data)
        customer = Customer.objects.filter(user=validated_data.pop('user')).first()
        validated_data['customer'] = customer.id
        print(validated_data)
        return Order.objects.create(**validated_data)
    


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