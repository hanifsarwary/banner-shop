from rest_framework.serializers import ModelSerializer

from api.models import Product, Option, SubOption


class OptionSerializer(ModelSerializer):
    class Meta:
        model = Option
        fields = '__all__'


class SubOptionSerializer(ModelSerializer):
    class Meta:
        model = SubOption
        fields = '__all__'


class ProductSerializer(ModelSerializer):
    option_set = OptionSerializer(many=True)
    
    class Meta:
        model = Product
        fields = '__all__'
