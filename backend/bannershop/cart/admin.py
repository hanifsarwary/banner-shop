from django.contrib import admin
from .models import Order, OrderOption, CustomerShippingDetail

# Register your models here.

admin.site.register(Order)
admin.site.register(OrderOption)
admin.site.register(CustomerShippingDetail)