from rest_framework.serializers import ModelSerializer
from api.models import Order, ProductOrder, ProductOrderOption


class OrderSerializer(ModelSerializer):

    class Meta:
        model = Order
        fields = '__all__'


class ProductOrderSerializer(ModelSerializer):

    class Meta:
        model = ProductOrder
        fields = '__all__'


class ProductOrderOptionSerializer(ModelSerializer):

    class Meta:
        model = ProductOrderOption
        fields = '__all__'