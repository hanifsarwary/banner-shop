from api.models import CustomOrder, Invoice
from rest_framework.serializers import ModelSerializer


class InvoiceSerializer(ModelSerializer):

    class Meta:
        model = Invoice
        fields = '__all__'


class CustomOrderSerializer(ModelSerializer):


    class Meta:
        model = CustomOrder
        fields = '__all__'

