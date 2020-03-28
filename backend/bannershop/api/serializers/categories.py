from rest_framework.serializers import ModelSerializer, Serializer, ListField
from api.serializers.products import ProductSerializer
from api.models import Category
from rest_framework_recursive.fields import RecursiveField

class CategorySerializer(ModelSerializer):
    
    class Meta:
        model = Category
        fields = '__all__'


class CategorySubCategoryProductSerializer(ModelSerializer):

    category_set = ListField(child=RecursiveField())
    product_set = ProductSerializer(many=True)
    class Meta:
        model = Category
        fields = '__all__'