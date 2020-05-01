from rest_framework.serializers import ModelSerializer
from api.models import Order, ProductOrder, ProductOrderOption
from api.serializers.customers import CustomerSerializer


class ProductOrderOptionSerializer(ModelSerializer):

    class Meta:
        model = ProductOrderOption
        fields = ('option', 'sub_option', 'quantity', 'price')


class ProductOrderSerializer(ModelSerializer):
    product_order_options = ProductOrderOptionSerializer(many=True)

    class Meta:
        model = ProductOrder
        fields = ('product', 'custom_image', 'special_note', 'total_price', 'total_weight', 'product_units',
                  'created_at', 'updated_at', 'product_order_options')


class OrderSerializer(ModelSerializer):
    order_productorders = ProductOrderSerializer(many=True)
    class Meta:
        model = Order
        fields = ('customer', 'customer_required_date', 'details', 'order_number', 'start_date', 'status', 
        'created_at', 'updated_at', 'order_productorders')
    

    def create(self, validated_data):
        product_orders_data = validated_data.pop('order_productorders')
        order = Order.objects.create(**validated_data)
        for p_data in product_orders_data:
            product_order_options_data = p_data.pop('product_order_options')
            product_order = ProductOrder.objects.create(order=order, **p_data)
            for po_data in product_order_options_data:
                ProductOrderOption.objects.create(product_order=product_order, **po_data)

        return order
