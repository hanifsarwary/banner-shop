from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView, ListAPIView
from api.models import PackingList, BoxesDetails
from api.serializers.packing_lists import PackingListSerializer, BoxDetailsSerializer, PackingListUpdateSerializer
from rest_framework.response import Response


class PackingListViewSet(ListCreateAPIView):

    serializer_class = PackingListSerializer
    queryset = PackingList.objects.all()

    def list(self, request, custom_order_id, *args, **kwargs):
        queryset = self.get_queryset().filter(custom_order_id=custom_order_id)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class BoxesListViewSet(ListCreateAPIView):

    serializer_class = BoxDetailsSerializer
    queryset = BoxesDetails.objects.all()

    def list(self, request, packing_list_id, *args, **kwargs):
        queryset = self.get_queryset().filter(packing_list_id=packing_list_id)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class PackingListDetailViewSet(RetrieveUpdateAPIView):

    serializer_class = PackingListUpdateSerializer
    queryset = PackingList.objects.all()



class BoxesDetailViewSet(RetrieveUpdateAPIView):

    serializer_class = BoxDetailsSerializer
    queryset = BoxesDetails.objects.all()

