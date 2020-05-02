from api.models import PackingList, BoxesDetails
from rest_framework.serializers import ModelSerializer


class BoxDetailsSerializer(ModelSerializer):

    class Meta:
        model = BoxesDetails
        fields = '__all__'

class PackingListSerializer(ModelSerializer):

    boxes = BoxDetailsSerializer(many=True, source='boxes_set')
    class Meta:
        model = PackingList
        fields = (
            'custom_order', 'address', 'city', 'first_name', 'last_name', 'company_name',
            'country', 'fax_number', 'phone_number',
            'zip_code', 'received_by', 'due_date', 'comments', 'boxes')
    
    def create(self, validated_data):
        print(validated_data)
        boxes_data = validated_data.pop('boxes')
        
        packing_list = PackingList.objects.create(**validated_data)
        for _data in boxes_data:
            BoxesDetails.objects.create(packing_list=packing_list, **_data)
        return order

