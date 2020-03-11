from django.core.mail import send_mail
from rest_framework.response import Response
from bannershop.settings import EMAIL_HOST_USER
from rest_framework.views import APIView
from api.models import Order, ProductOrder


class SendOrderEmail(APIView):

    def get(self, request, *args, **kwargs):
        
        
        order = Order.objects.get(pk=kwargs['order_id']) 
        product_orders = ProductOrder.objects.filter(order_id=kwargs['order_id'])
        message = " A customer Name: " + order.customer.user.first_name + ' ' + order.customer.user.last_name
        message += "\n and Email: " + order.customer.user.email + '\n posted an order under order no:' + str(order.order_number)

        send_mail(" dummy subject", message, EMAIL_HOST_USER, ['hanifsarwari.nuces@gmail.com'])
        return Response({"message": "email is sent"})
