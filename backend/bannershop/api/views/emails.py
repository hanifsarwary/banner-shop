from django.core.mail import send_mail
from rest_framework.response import Response
from bannershop.settings import EMAIL_HOST_USER
from rest_framework.views import APIView
from api.models import Order, ProductOrder


class SendOrderEmail(APIView):

    def post(self, request, *args, **kwargs):
        try:
            send_mail(request.data['subject'], request.data['message'], EMAIL_HOST_USER, list.append(request.data['to']))
            return Response({"message": "email is sent", "status": 200})
        except Exception as e:
            return Response({"message": str(e)})
