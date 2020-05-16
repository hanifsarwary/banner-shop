# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from api.models import (
    Product, Category, Option, SubOption, Customer, Coupon, CustomQuote, ContactRequest,
    TwoDependentSubOption, ThreeDependentSubOption, CustomOrder
    )


admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Option)
admin.site.register(SubOption)
admin.site.register(Customer)
admin.site.register(Coupon)
admin.site.register(CustomQuote)
admin.site.register(ContactRequest)
admin.site.register(TwoDependentSubOption)
admin.site.register(ThreeDependentSubOption)
admin.site.register(CustomOrder)