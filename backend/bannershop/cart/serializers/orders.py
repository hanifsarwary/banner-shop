from rest_framework.serializers import ModelSerializer
from cart.models import Order, OrderOption
from api.serializers.customers import CustomerSerializer
from api.serializers.products import ProductSerializer

class OrderOptionSerializer(ModelSerializer):

    class Meta:
        model = OrderOption
        fields = '__all__'


class OrderRetrieveSerializer(ModelSerializer):
    order_options = OrderOptionSerializer(many=True, source='order_options_set')
    customer = CustomerSerializer()
    product = ProductSerializer()
    class Meta:
        model = Order
        fields = ('customer', 'product', 'special_note', 'due_date', 'invoice_number', 'internal_notes',
                  'image', 'proof_status', 'reference_number', 'status', 'quoted_price', 'shipping_type', 'is_cart',
                  'created_at', 'updated_at', 'order_options')



class OrderCreateSerializer(ModelSerializer):

    class Meta:
        model = Order
        fields = '__all__'