# Generated by Django 3.0.3 on 2020-04-13 15:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0043_auto_20200412_0940'),
    ]

    operations = [
        migrations.AddField(
            model_name='twodependentsuboption',
            name='product',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Product'),
        ),
    ]
