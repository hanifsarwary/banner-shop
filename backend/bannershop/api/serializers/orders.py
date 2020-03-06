from rest_framework.serializers import ModelSerializer
from api.models import Order, ProductOrder


class OrderSerializer(ModelSerializer):

    class Meta:
        model = Order
        fields = '__all__'


class ProductOrderSerializer(ModelSerializer):

    class Meta:
        model = ProductOrder
        fields = '__all__'