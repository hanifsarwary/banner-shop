from api.models import PackingList, BoxesDetails
from rest_framework.serializers import ModelSerializer


class PackingListSerializer(ModelSerializer):

    class Meta:
        model = PackingList
        fields = '__all__'


class BoxDetailsSerializer(ModelSerializer):

    class Meta:
        model = BoxesDetails
        fields = '__all__'