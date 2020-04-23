from rest_framework.serializers import ModelSerializer
from api.serializers.users import CreateUserSerializer
from api.models import Customer


class CustomerSerializer(ModelSerializer):

    user = CreateUserSerializer()
    class Meta:
        model = Customer
        fields = '__all__'
