from rest_framework.serializers import ModelSerializer
from api.serializers.users import CreateUserSerializer
from api.models import Customer
from django.contrib.auth.models import User

class CustomerSerializer(ModelSerializer):

    user = CreateUserSerializer()
    class Meta:
        model = Customer
        fields = '__all__'
    
    def create(self, validated_data):
        user = validated_data.pop('user')
        user = User.objects.create(**user)
        return Customer.objects.create(user=user, **validated_data)

        
