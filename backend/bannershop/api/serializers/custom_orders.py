from api.models import CustomOrder, Invoice, ProofHistory
from rest_framework.serializers import ModelSerializer


class InvoiceSerializer(ModelSerializer):

    class Meta:
        model = Invoice
        fields = '__all__'


class CustomOrderSerializer(ModelSerializer):


    class Meta:
        model = CustomOrder
        fields = '__all__'



class ProofHistorySerializer(ModelSerializer):

    class Meta:
        model = ProofHistory
        fields = '__all__'