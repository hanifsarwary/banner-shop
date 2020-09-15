from rest_framework.serializers import ModelSerializer

from api.models import Product, Option, SubOption, DescriptionImage


class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'



class SmallProductSerializer(ModelSerializer):
    
    class Meta:
        model = Product
        fields = ('id', 'product_name')
        


class OptionSerializer(ModelSerializer):
    class Meta:
        model = Option
        fields = '__all__'


class SubOptionSerializer(ModelSerializer):
    class Meta:
        model = SubOption
        fields = '__all__'


class OptionDetailSerializer(ModelSerializer):
    suboption_set = SubOptionSerializer(many=True , read_only=True)
    class Meta:
        model = Option
        fields = '__all__'


class ProductDetailSerializer(ModelSerializer):
    option_set = OptionDetailSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = '__all__'
        

class DescriptionImageSerializer(ModelSerializer):

    class Meta:
        model = DescriptionImage
        fields = '__all__'