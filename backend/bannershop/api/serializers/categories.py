from rest_framework.serializers import ModelSerializer, ListField, SerializerMethodField
from api.serializers.products import ProductSerializer
from api.models import Category, Product

class CategorySerializer(ModelSerializer):
    
    class Meta:
        model = Category
        fields = '__all__'


class CategorySubCategoryProductSerializer(ModelSerializer):

    children_categories = SerializerMethodField()
    products = SerializerMethodField()

    class Meta:
        model = Category
        fields = ('id', 'name', 'children_categories', 'products')



    def get_children_categories(self, obj):
        queryset = Category.objects.filter(parent_category=obj.id)
        if not queryset:
            return None

        else:
            serialized_data = CategorySubCategoryProductSerializer(queryset, many=True).data
        return serialized_data
    
    def get_products(self, obj):
        
        queryset = Product.objects.filter(category=obj.id)
        serialized_data = ProductSerializer(queryset, many=True)

        return serialized_data