# Generated by Django 3.0.3 on 2020-03-29 08:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0030_auto_20200329_0631'),
    ]

    operations = [
        migrations.AlterField(
            model_name='option',
            name='product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Product'),
        ),
    ]