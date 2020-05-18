from rest_framework.serializers import ModelSerializer
from cart.models import CustomerShippingDetail


class ShippingDetailSerializer(ModelSerializer):

    class Meta:
        model = CustomerShippingDetail
        fields = '__all__'