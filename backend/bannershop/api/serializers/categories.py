from rest_framework.serializers import ModelSerializer
from api.serializers.products import ProductSerializer
from api.models import Category


class CategorySerializer(ModelSerializer):
    
    class Meta:
        model = Category
        fields = '__all__'


class RecursiveField(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data

class CategorySubCategoryProductSerializer(ModelSerializer):

    category_set = RecursiveField(many=True)
    product_set = ProductSerializer(many=True)
    class Meta:
        model = Category
        fields = '__all__'