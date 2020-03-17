# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from api.models import Product, ProductOrder, Category, Option, SubOption, Customer, Coupon, CustomQuote, ContactRequest, ProductOrderOption


admin.site.register(Product)
admin.site.register(ProductOrder)
admin.site.register(Category)
admin.site.register(Option)
admin.site.register(SubOption)
admin.site.register(Customer)
admin.site.register(Coupon)
admin.site.register(CustomQuote)
admin.site.register(ContactRequest)
admin.site.register(ProductOrderOption)