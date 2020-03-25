from rest_framework.serializers import ModelSerializer

from api.models import Product, Option, SubOption


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'



class OptionSerializer(ModelSerializer):
    class Meta:
        model = Option
        fields = '__all__'


class SubOptionSerializer(ModelSerializer):
    class Meta:
        model = SubOption
        fields = '__all__'


class OptionDetailSerializer(ModelSerializer):
    sub_option_set = SubOptionSerializer(many=True)
    class Meta:
        model = Option
        fields = '__all__'

class ProductDetailSerializer(ModelSerializer):
    option_set = OptionDetailSerializer(many=True)
    class Meta:
        model = SubOption
        fields = '__all__'

