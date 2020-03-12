from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
import uuid

class Category(models.Model):
    parent_category = models.ForeignKey("self", on_delete=models.DO_NOTHING, null=True, blank=True)

    name = models.CharField(max_length=64, db_index=True)
    default_category_image = models.FileField(null=True, blank=True, upload_to='images/categories/')

    is_deleted = models.BooleanField(default=False)
    have_sub_categories = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.name


class Coupon(models.Model):
    coupon_code = models.CharField(max_length=128, unique=True)
    coupon_name = models.CharField(max_length=128, db_index=True)
    discount_percentage = models.FloatField()
    expiry_date = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.coupon_name


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING, null=True)

    default_product_image = models.FileField(null=True, blank=True, upload_to='images/products/')
    one_unit_weight = models.FloatField(default=0)
    weight_unit = models.PositiveIntegerField(default=1)
    product_name = models.CharField(max_length=128)

    is_featured = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    is_coupon_allowed = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.product_name


class Option(models.Model):
    product = models.ForeignKey(Product, on_delete=models.DO_NOTHING)

    one_unit_price = models.FloatField(null=True, blank=True)
    option_name = models.CharField(max_length=64)
    price_unit = models.PositiveIntegerField(default=1)

    is_deleted = models.BooleanField(default=False)
    is_suboptions = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.option_name + '  --- ' + self.product.product_name


class SubOption(models.Model):
    option = models.ForeignKey(Option, on_delete=models.DO_NOTHING)

    name = models.CharField(max_length=64)
    price = models.FloatField(default=0)
    is_deleted = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.name + ' ---- ' + self.option.__str__()


class ProductOption(models.Model):
    option = models.ForeignKey(Option, on_delete=models.DO_NOTHING)
    Product = models.ForeignKey(Product, on_delete=models.DO_NOTHING)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return "{} - {}".format(self.id, self.option_id)


class Customer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)


class Order(models.Model):
    STATUS_CHOICES = (
        ('Cancelled', 'Cancelled'),
        ('At Risk', 'At Risk'),
        ('Payment Pending', 'Payment Pending'),
        ('Completed', 'Completed'),
        ('Delivered', 'Delivered'),
        ('In Progress', 'In Progress'),
        ('Yet To Start', 'Yet To Start'),
    )

    customer = models.ForeignKey(Customer, on_delete=models.DO_NOTHING)
    customer_required_date = models.DateField(null=True, blank=True)
    details = models.TextField(max_length=512)
    order_number = models.UUIDField(default=uuid.uuid4, editable=False)
    start_date = models.DateField(null=True, blank=True)
    status = models.CharField(choices=STATUS_CHOICES, max_length=32)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)


class ProductOrder(models.Model):
    product = models.ForeignKey(Product, related_name='product_productorders', on_delete=models.DO_NOTHING)
    order = models.ForeignKey(Order, related_name='order_productorders' ,on_delete=models.DO_NOTHING)

    custom_image = models.FileField(null=True, blank=True, upload_to='images/order_custom/')
    special_note = models.CharField(max_length=128)
    total_price = models.FloatField(default=0)
    total_weight = models.FloatField(default=0)
    product_units = models.FloatField(default=1)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)


class ProductOrderOption(models.Model):

    product_order = models.ForeignKey(ProductOrder,related_name='product_order_options', on_delete=models.DO_NOTHING)
    option = models.ForeignKey(Option, on_delete=models.DO_NOTHING)
    sub_option = models.ForeignKey(SubOption, on_delete=models.DO_NOTHING, null=True, blank=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)
    price = models.FloatField(null=True, blank=True)

class CustomQuote(models.Model):
    additional_requirements = models.CharField(max_length=512)
    company_name = models.CharField(max_length=64)
    contact_name = models.CharField(max_length=64)
    custom_image = models.FileField(null=True, blank=True, upload_to='images/custom_quote/')
    email = models.EmailField()
    fax_no = models.CharField(max_length=16, null=True, blank=True)
    finish_size = models.CharField(max_length=64)
    ink_desc = models.CharField(max_length=64)
    job_type = models.CharField(max_length=32)
    job_desc = models.CharField(max_length=512)
    media_desc = models.CharField(max_length=128)
    old_job_reference = models.CharField(max_length=64)
    phone_no = models.CharField(max_length=16)
    quantity = models.PositiveIntegerField()
    required_ship_date = models.DateTimeField(null=True, blank=True)
    is_proof = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.company_name


class ContactRequest(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.DO_NOTHING)
    approach_details = models.CharField(max_length=128)
    message = models.CharField(max_length=1024)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.customer.email
