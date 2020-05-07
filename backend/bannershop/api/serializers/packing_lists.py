from api.models import PackingList, BoxesDetails
from rest_framework.serializers import ModelSerializer, Serializer


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
            'country', 'fax_number', 'phone_number', 'id',
            'zip_code', 'received_by', 'due_date', 'comments', 'boxes')
    
    def create(self, validated_data):
        print(validated_data)
        boxes_data = validated_data.pop('boxes_set')
        
        packing_list = PackingList.objects.create(**validated_data)
        for _data in boxes_data:
            BoxesDetails.objects.create(packing_list=packing_list, **_data)
        return packing_list



class PackingListUpdateSerializer(ModelSerializer):

    class Meta:
        model = PackingList
        fields = (
            'custom_order', 'address', 'city', 'first_name', 'last_name', 'company_name',
            'country', 'fax_number', 'phone_number', 'id',
            'zip_code', 'received_by', 'due_date', 'comments')


class BoxesBulkCreateSerializer(Serializer):

    boxes = BoxDetailsSerializer(many=True)

    def create(self, validated_data):
        boxes_data = validated_data.pop('boxes')
        boxes_arr = []
        for _data in boxes_data:
            {
            "number_of_boxes": 10,
            "quantity_per_box": 10
}
            boxes_arr.append(
                BoxesDetails.objects.create(
                    quantity_per_box=_data.get("quantity_per_box"), 
                    number_of_boxes=_data.get("number_of_boxes"),
                    packing_list=_data.get("packing_list")))
        return boxes_arr