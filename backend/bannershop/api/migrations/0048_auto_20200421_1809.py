# Generated by Django 3.0.3 on 2020-04-21 18:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0047_auto_20200421_1751'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='company_name',
            field=models.CharField(blank=True, db_index=True, max_length=512, null=True),
        ),
    ]
