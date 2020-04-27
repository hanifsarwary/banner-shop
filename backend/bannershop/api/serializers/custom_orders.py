from api.models import CustomOrder, Invoice, ProofHistory
from rest_framework.serializers import ModelSerializer
from api.serializers.users import RetrieveUserSerializer
from api.serializers.customers import CustomerSerializer
class InvoiceSerializer(ModelSerializer):

    class Meta:
        model = Invoice
        fields = '__all__'


class CustomOrderSerializer(ModelSerializer):

    added_by = RetrieveUserSerializer()
    customer = CustomerSerializer()
    
    class Meta:
        model = CustomOrder
        fields = '__all__'


class CustomOrderCreateSerializer(ModelSerializer):

    class Meta:
        model = CustomOrder
        fields = '__all__'


class ProofHistorySerializer(ModelSerializer):

    class Meta:
        model = ProofHistory
        fields = '__all__'


class ProofStatusUpdateSerializer(models.ModelSerializer):

    class Meta:
        model = CustomOrder
        fields = ('proof_status', )