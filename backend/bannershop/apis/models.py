# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
from django.db import models

# Create your models here.

class Category(models.Model):

    category_name = models.CharField(max_length=64, db_index=True)
    parent_category = models.ForeignKey("self", on_delete=models.DO_NOTHING, null=True, blank=True)
    is_deleted = models.BooleanField(default=False)
    default_category_image = models.FileField(null=True, blank=True, upload_to='categoryimages/')

    def __str__(self):
        return self.category_name


class Coupon(models.Model):

    coupon_name = models.CharField(max_length=128, db_index=True)
    coupon_code = models.CharField(max_length=128, unique=True)
    discount_percentage = models.FloatField()
    last_active_date = models.DateTimeField(null=True, blank=True)


class Product(models.Model):

    product_name = models.CharField(max_length=128)
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING, null=True)
    is_featured = models.BooleanField(default=False, db_index=True)
    is_deleted = models.BooleanField(default=False)
    weight_unit = models.PositiveIntegerField(default=1)
    one_unit_weight = models.FloatField(default=0)
    is_coupon_allowed = models.BooleanField(default=False)
    default_product_image = models.FileField(null=True, blank=True, upload_to='categoryimages/')
    
    def __str__(self):
        return self.product_name


class Option(models.Model):
    
    option_name = models.CharField(max_length=64)
    price_unit = models.PositiveIntegerField(default=1)
    one_unit_price = models.FloatField(null=True, blank=True)
    is_deleted = models.BooleanField(default=False)
    product = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    
    def __str__(self):
        return self.option_name


class SubOption(models.Model):

    display_text = models.CharField(max_length=64)
    is_deleted = models.BooleanField(default=False)
    option = models.ForeignKey(Option, on_delete=models.DO_NOTHING)



class Customer(models.Model):

    customer_name = models.CharField(max_length=128)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)



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
    details = models.CharField(max_length=512, default="")
    customer = models.ForeignKey(Customer, on_delete=models.DO_NOTHING)
    status = models.CharField(choices=STATUS_CHOICES, max_length=32)
    customer_required_date = models.DateTimeField(null=True, blank=True)
    start_date = models.DateTimeField()


class ProductOrder(models.Model):

    product = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    order = models.ForeignKey(Order, on_delete=models.DO_NOTHING)
    special_note = models.CharField(max_length=128)
    total_price = models.FloatField(default=0)
    total_weight = models.FloatField(default=0)
    product_units = models.FloatField(default=1)
    custom_image = models.FileField()
