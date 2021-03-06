from django.core.mail import send_mail
from rest_framework.response import Response
from bannershop.settings import EMAIL_HOST_USER
from rest_framework.views import APIView

class SendOrderEmail(APIView):

    def post(self, request, *args, **kwargs):
        try:
            to =[].append(request.data['message'])
            send_mail(request.data['subject'], request.data['message'], EMAIL_HOST_USER, to)
            return Response({"message": "email is sent", "status": 200})
        except Exception as e:
            return Response({"message": str(e)})
