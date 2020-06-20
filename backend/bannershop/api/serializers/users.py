from rest_framework.serializers import ModelSerializer, CharField
from django.contrib.auth.models import User


class RetrieveUserSerializer(ModelSerializer):
    password = CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password', 'is_staff', 'is_superuser')


class CreateUserSerializer(ModelSerializer):

    password = CharField(max_length=255, style={'input_type': 'password'})
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password', 'is_staff', 'is_superuser')

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
