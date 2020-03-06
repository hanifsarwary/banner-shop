from rest_framework.serializers import ModelSerializer

from api.models import ContactRequest


class ContactRequestSerializer(ModelSerializer):

    class Meta:
        model = ContactRequest
        fields = '__all__'