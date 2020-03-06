from rest_framework.serializers import ModelSerializer

from api.models import CustomQuote


class CustomQuoteSerializer(ModelSerializer):
    
    class Meta:
        model = CustomQuote
        fields = '__all__'
