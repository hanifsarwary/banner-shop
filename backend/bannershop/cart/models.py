from django.db import models
from api.models import Customer, CustomOrder, Product, Option, SubOption
# Create your models here.

class Order(models.Model):

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    customer_required_date = models.DateField(null=True, blank=True)
    details = models.TextField(max_length=512)
    start_date = models.DateField(null=True, blank=True)
    status = models.CharField(choices=CustomOrder.STATUS_CHOICES, max_length=64)
    special_instruction = models.TextField(null=True)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return str(self.id)



class ProductOrder(models.Model):
    product = models.ForeignKey(Product, related_name='product_productorders', on_delete=models.CASCADE)
    order = models.ForeignKey(Order, related_name='order_productorders' ,on_delete=models.CASCADE)

    custom_image = models.FileField(null=True, blank=True, upload_to='images/order_custom/')
    special_note = models.CharField(max_length=128)
    total_price = models.FloatField(default=0)
    total_weight = models.FloatField(default=0)
    product_units = models.FloatField(default=1)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.product.__str__() + ' ------- ' + self.order.__str__()

class ProductOrderOption(models.Model):

    product_order = models.ForeignKey(ProductOrder,related_name='product_order_options', on_delete=models.CASCADE)
    option = models.ForeignKey(Option, on_delete=models.CASCADE)
    sub_option = models.ForeignKey(SubOption, on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)
    price = models.FloatField(null=True, blank=True)

