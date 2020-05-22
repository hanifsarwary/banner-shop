from rest_framework.serializers import ModelSerializer, Serializer
from api.serializers.users import CreateUserSerializer
from api.models import Customer
from django.contrib.auth.models import User

class CustomerSerializer(ModelSerializer):

    user = CreateUserSerializer()
    class Meta:
        model = Customer
        fields = '__all__'
    
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create(**user_data)
        user.set_password(user_data['password'])
        user.save()
        return Customer.objects.create(user=user, **validated_data)
    
    def update(self, instance, validated_data):
        user_data = validated_data['user']
        instance.bussiness_type = validated_data.get('bussiness_type', instance.bussiness_type)
        instance.address = validated_data.get('address', instance.address)
        instance.city = validated_data.get('city', instance.city)
        instance.company_name = validated_data.get('company_name', instance.company_name)
        instance.country = validated_data.get('country', instance.country)
        instance.fax_number = validated_data.get('fax_number', instance.fax_number)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.resale_no = validated_data.get('resale_no', instance.resale_no)
        instance.second_email = validated_data.get('second_email', instance.second_email)
        instance.status = validated_data.get('status', instance.status)
        instance.third_email = validated_data.get('third_email', instance.third_email)
        instance.zip_code = validated_data.get('zip_code', instance.zip_code)
        instance.user.first_name = user_data.get('first_name', instance.user.first_name)
        instance.user.last_name = user_data.get('last_name', instance.user.last_name)
        instance.user.email = user_data.get('email', instance.user.email)
        instance.user.save()
        instance.save()
        return instance


        return instance

        
class CustomerStatusUpdateSerializer(ModelSerializer):

    class Meta:
        model = Customer
        fields = ('status', )

    