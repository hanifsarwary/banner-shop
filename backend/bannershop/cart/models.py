from django.db import models
from api.models import Customer, CustomOrder, Product, Option, SubOption

class Order(models.Model):
    
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
        ('Submitted', 'Submitted')
    )
    PROOF_STATUS_CHOICES = (('Proof File in Development','Proof File in Development'),
                            ('Proof Submitted', 'Proof Submitted'),
                            ('Proof Approved', 'Proof Approved'),
                            ('Proof Rejected', 'Proof Rejected'),
                            ('Awaiting Proof Approval', 'Awaiting Proof Approval'),
                            ('Proof Resubmitted', 'Proof Resubmitted'))
    
    SHIPPING_TYPE_CHOICES = (('No Shipment', 'No Shipment'),
                             ('Delivery', 'Delivery'),
                             ('Shipping', 'Shipping'))

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    special_note = models.TextField(null=True, blank=True)
    due_date = models.DateField(null=True, blank=True, db_index=True)
    invoice_number = models.CharField(max_length=256, null=True, blank=True)
    internal_notes = models.TextField(null=True, blank=True)
    image = models.FileField(null=True, blank=True, upload_to='images/cart-images/')
    job_name = models.CharField(default=' ', max_length=256)
    proof_status = models.CharField(max_length=32, choices=PROOF_STATUS_CHOICES,
                                    default=PROOF_STATUS_CHOICES[0][0])
    reference_number = models.CharField(max_length=256, null=True, blank=True, db_index=True)
    status = models.CharField(choices=STATUS_CHOICES, max_length=64, db_index=True)
    quoted_price = models.FloatField(null=True)
    shipping_type = models.CharField(max_length=64, 
                                     choices=SHIPPING_TYPE_CHOICES, null=True, blank=True)

    is_cart = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)


class OrderOption(models.Model):

    order = models.ForeignKey(
        Order, related_name='order_options', on_delete=models.CASCADE)
    option = models.ForeignKey(Option, on_delete=models.CASCADE)
    sub_option = models.ForeignKey(SubOption, on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)
    price = models.FloatField(null=True, blank=True)


class CustomerShippingDetail(models.Model):
    
    customer = models.OneToOneField(Customer, on_delete=models.CASCADE)
    shipping_contact_name = models.CharField(max_length=256, null=True, blank=True)
    shipping_street_address = models.CharField(max_length=512, null=True, blank=True)
    shipping_city = models.CharField(max_length=64, null=True, blank=True)
    shipping_state = models.CharField(max_length=64, null=True, blank=True)
    shipping_zip_code = models.CharField(max_length=16, null=True, blank=True)
