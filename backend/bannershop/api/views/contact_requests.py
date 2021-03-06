from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView

from api.models import ContactRequest
from api.serializers.contact_requests import ContactRequestSerializer


class ContactRequestViewSet(ListCreateAPIView):

    serializer_class = ContactRequestSerializer
    queryset = ContactRequest.objects.all().order_by('-id')


class ContactRequestDetailViewSet(RetrieveUpdateAPIView):

    serializer_class = ContactRequestSerializer
    queryset = ContactRequest.objects.all()
    