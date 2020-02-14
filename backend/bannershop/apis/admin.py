# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from apis.models import Product, ProductOrder, Category, Option, SubOption, Customer, Coupon
# Register your models here.

admin.site.register(Product)
admin.site.register(ProductOrder)
admin.site.register(Category)
admin.site.register(Option)
admin.site.register(SubOption)
admin.site.register(Customer)
admin.site.register(Coupon)