from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField
from api.constants import *
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
    PRICE_TYPES = (
        (PRODUCT_PER_SQFT, 'Basic Price calculated per square foot'),
        (PRODUCT_VARIABLE_PER_QUANTITY, 'Basic price calculated with quantity range'),
        (PRODUCT_FIXED_PER_QUANTITY, 'Fixed charge for fixed quantity'),
        (PRODUCT_TWO_OPTION, 'Basic price based upon two options'),
        (PRODUCT_THREE_OPTION, 'Basic price based upon Three options'),
    )
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING, null=True)

    default_product_image = models.FileField(null=True, blank=True, upload_to='images/products/')
    one_unit_weight = models.FloatField(default=0)
    weight_unit = models.PositiveIntegerField(default=1)
    price_type = models.IntegerField(choices=PRICE_TYPES, default=PRODUCT_PER_SQFT)
    price_details = JSONField(null=True, blank=True)
    product_name = models.CharField(max_length=128)
    product_description = models.TextField(null=True, blank=True)
    setup_cost = models.FloatField(default=0)

    is_featured = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    is_coupon_allowed = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.product_name
    

    class Meta:
        ordering = ('category', 'product_name')


class Option(models.Model):
    OPTION_TYPES = ((OPTION_FLAT_RATE, 'Flat Rate'),
                    (OPTION_BASIC_PERCENTAGE, 'Basic Percentage'),
                    (OPTION_ACCUMULATIVE_PERCENTAGE, 'ACCUMULATIVE Percentage'),
                    (OPTION_QUANTITY_BASED, 'quantity Based'),
                    (OPTION_MULTIPLY_BASIC, 'multiply value with basic price'))
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)

    option_name = models.CharField(max_length=64)
    price_unit = models.PositiveIntegerField(default=1)
    option_type = models.IntegerField(choices=OPTION_TYPES, default=OPTION_QUANTITY_BASED)

    option_description = models.TextField(null=True, blank=True)
    is_deleted = models.BooleanField(default=False)
    is_suboptions = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.option_name + '  --- ' + self.product.product_name
    
    class Meta:
        ordering = ('product', 'is_suboptions', 'created_at')


class SubOption(models.Model):
    option = models.ForeignKey(Option, on_delete=models.CASCADE, null=True)

    name = models.CharField(max_length=64)
    price = models.FloatField(default=0)
    is_deleted = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.name + ' ---- ' + self.option.__str__()
    
    class Meta:
        ordering = ('price', 'created_at')


class TwoDependentSubOption(models.Model):

    first_sub_option = models.ForeignKey(SubOption, on_delete=models.CASCADE, null=True, blank=True, related_name='two_first_option_set')
    second_sub_option = models.ForeignKey(SubOption, on_delete=models.CASCADE, null=True, blank=True, related_name='two_second_option_set')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    price = models.FloatField(default=0)

    def __str__(self):
        return self.first_sub_option.name + ' ---- ' + self.second_sub_option.name


class ThreeDependentSubOption(models.Model):

    first_sub_option = models.ForeignKey(SubOption, on_delete=models.CASCADE, null=True, blank=True, related_name='three_first_option_set')
    second_sub_option = models.ForeignKey(SubOption, on_delete=models.CASCADE, null=True, blank=True, related_name='three_second_option_set')
    third_sub_option = models.ForeignKey(SubOption, on_delete=models.CASCADE, null=True, blank=True, related_name='three_third_option_set')
    price = models.FloatField(default=0)

    def __str__(self):
        return self.first_sub_option.name + ' ---- ' + self.second_sub_option.name + ' ---- ' + self.third_sub_option.name


class Customer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    
    approach_details = models.TextField(null=True, blank=True)
    bussiness_type = models.TextField(null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    city = models.CharField(max_length=64, null=True, blank=True)
    company_name = models.CharField(max_length=512, null=True, blank=True, db_index=True)
    country = models.CharField(max_length=16, null=True, blank=True)
    fax_number = models.CharField(max_length=32, null=True, blank=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    zip_code = models.CharField(max_length=16, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)


class CustomOrder(models.Model):
    
    STATUS_CHOICES = (
        ('Picked Up', 'Picked Up'),
        ('Cancelled', 'Cancelled'),
        ('Delivered', 'Delivered'),
        ('Shipped', 'Shipped'),
        ('Mailing Dept.', 'Mailing Dept.'),
        ('Bindery Dept.', 'Bindery Dept.'),
        ('On Press', 'On Press'),
        ('Proof Resubmitted - Waiting approval', 'Proof Resubmitted - Waiting approval'),
        ('Proof Rejected', 'Proof Rejected'),
        ('Proof Approved', 'Proof Approved'),
        ('Proof Submitted', 'Proof Submitted'),
        ('Prepress Dept.', 'Prepress Dept.'),
        ('On Hold', 'On Hold'),
        ('Submitted', 'Submitted'),
        ('Yet To Start', 'Yet To Start'),
    )
    PROOF_STATUS_CHOICES = (('Proof File in Development','Proof File in Development'),
                            ('Proof Submitted', 'Proof Submitted'),
                            ('Proof Approved', 'Proof Approved'),
                            ('Proof Rejected', 'Proof Rejected'),
                            ('Awaiting Proof Approval', 'Awaiting Proof Approval'),
                            ('Proof Resubmitted', 'Proof Resubmitted'))
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    added_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    due_date = models.DateField(null=True, blank=True, db_index=True)
    # order_number = models.UUIDField(default=uuid.uuid4, editable=False)
    custom_job_name = models.CharField(max_length=256, null=True, blank=True)
    custom_product_name = models.CharField(max_length=256, null=True, blank=True, db_index=True)
    custom_quantity = models.PositiveIntegerField(null=True, blank=True)
    custom_version = models.CharField(max_length=16, null=True, blank=True)
    custom_proof = models.CharField(max_length=16, null=True, blank=True)
    custom_sample = models.TextField()
    custom_paper = models.TextField()
    
    flat_size = models.CharField(max_length=256, null=True, blank=True)
    ink_color = models.TextField(null=True, blank=True)
    internal_notes = models.TextField()
    job_number = models.IntegerField(unique=True, blank=True, null=True)
    proof_status = models.CharField(max_length=32, choices=PROOF_STATUS_CHOICES,
                                    default=PROOF_STATUS_CHOICES[0][0])
    reference_number = models.CharField(max_length=256, null=True, blank=True, db_index=True)
    status = models.CharField(choices=STATUS_CHOICES, max_length=64, db_index=True)
    quoted_price = models.FloatField(null=True)
    ticket_count = models.PositiveIntegerField(default=0, null=True)
    special_instructoon = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)



class PackingList(models.Model):

    custom_order = models.OneToOneField(CustomOrder, on_delete=models.CASCADE, null=True)
    address = models.TextField(null=True, blank=True)
    city = models.CharField(max_length=64, null=True, blank=True)
    company_name = models.CharField(max_length=512, null=True, blank=True, db_index=True)
    country = models.CharField(max_length=16, null=True, blank=True)
    fax_number = models.CharField(max_length=32, null=True, blank=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    zip_code = models.CharField(max_length=16, null=True, blank=True)
    received_by = models.CharField(max_length=32, null=True)
    due_date = models.DateTimeField(null=True)
    comments = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)



class BoxesDetails(models.Model):
    
    packing_list = models.ForeignKey(PackingList, on_delete=models.CASCADE)
    number_of_boxes = models.PositiveIntegerField(default=0)
    quantity_per_box = models.PositiveIntegerField(default=0)


class Invoice(models.Model):

    custom_order = models.OneToOneField(CustomOrder, on_delete=models.CASCADE, null=True)
    authorization_code = models.CharField(max_length=256, null=True, blank=True)
    invoice_number = models.IntegerField(unique=True, null=True, blank=True)
    paid_by = models.CharField(max_length=512, null=True, blank=True)
    payment_method = models.CharField(max_length=512, null=True, blank=True)

    sold_to = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return str(self.invoice_number)


class ProofHistory(models.Model):
    custom_order = models.ForeignKey(CustomOrder, on_delete=models.CASCADE)
    created_at = models.DateField(auto_now_add=True)
    proof_status = models.CharField(max_length=256, null=True, choices=CustomOrder.PROOF_STATUS_CHOICES)


class Order(models.Model):

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    customer_required_date = models.DateField(null=True, blank=True)
    details = models.TextField(max_length=512)
    order_number = models.UUIDField(default=uuid.uuid4, editable=False)
    start_date = models.DateField(null=True, blank=True)
    status = models.CharField(choices=CustomOrder.STATUS_CHOICES, max_length=64)
    special_instruction = models.TextField(null=True)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return str(self.order_number)



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



class CustomQuote(models.Model):
    additional_requirements = models.CharField(max_length=512)
    company_name = models.CharField(max_length=64)
    contact_name = models.CharField(max_length=64)
    custom_image = models.FileField(null=True, blank=True, upload_to='images/custom_quote/')
    email = models.EmailField()
    fax_no = models.CharField(max_length=16, null=True, blank=True)
    finish_size = models.CharField(max_length=64)
    ink_desc = models.CharField(max_length=64)
    job_type = models.TextField()
    job_desc = models.TextField()
    media_desc = models.CharField(max_length=128)
    old_job_reference = models.CharField(max_length=64)
    phone_no = models.CharField(max_length=16)
    quantity = models.PositiveIntegerField()
    required_ship_date = models.DateTimeField(null=True, blank=True)
    proof_type = models.CharField(max_length=32, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.company_name


class ContactRequest(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    approach_details = models.CharField(max_length=128)
    message = models.CharField(max_length=1024)

    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.customer.email
