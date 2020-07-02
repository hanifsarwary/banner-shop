from api.models import CustomOrder, ProofHistory
from rest_framework.serializers import ModelSerializer
from api.serializers.users import RetrieveUserSerializer
from api.serializers.customers import CustomerSerializer
# class InvoiceSerializer(ModelSerializer):

#     class Meta:
#         model = Invoice
#         fields = '__all__'


class CustomOrderSerializer(ModelSerializer):

    added_by = RetrieveUserSerializer()
    customer = CustomerSerializer()
    
    class Meta:
        model = CustomOrder
        fields = '__all__'


class CustomOrderCreateSerializer(ModelSerializer):
    
    class Meta:
        model = CustomOrder
        fields = (
            'customer', 'added_by', 'due_date', 'custom_job_name',
            'custom_product_name','invoice_number', 'custom_quantity', 'custom_version', 
            'custom_proof', 'custom_paper', 'flat_size', 'ink_color', 
            'internal_notes', 'reference_number','status','quoted_price', 
            'ticket_count', 'special_instructoon', 'final_size', 
            'shipping_type', 'shipping_contact_name', 'shipping_street_address',
            'shipping_city', 'shipping_state', 'shipping_zip_code')


class CustomOrderUpdateSerializer(ModelSerializer):

    class Meta:
        model = CustomOrder
        fields = (
            'customer', 'added_by', 'due_date', 'custom_job_name',
            'custom_product_name', 'custom_quantity', 'custom_version', 
            'custom_proof', 'custom_paper', 'flat_size', 'ink_color', 
            'internal_notes', 'reference_number','status','quoted_price', 
            'ticket_count', 'special_instructoon', 'final_size', 'invoice_number',
            'shipping_type', 'shipping_contact_name', 'shipping_street_address',
            'shipping_city', 'shipping_state', 'shipping_zip_code')


class ProofHistorySerializer(ModelSerializer):

    class Meta:
        model = ProofHistory
        fields = '__all__'


class ProofStatusUpdateSerializer(ModelSerializer):

    class Meta:
        model = CustomOrder
        fields = ('proof_status', )

