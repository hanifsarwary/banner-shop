# Generated by Django 3.0.3 on 2020-03-12 08:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_auto_20200312_0735'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productorderoption',
            name='product_order',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='product_order_option', to='api.ProductOrder'),
        ),
    ]
