# Generated by Django 3.0.3 on 2020-05-02 12:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0058_auto_20200501_0824'),
    ]

    operations = [
        migrations.AddField(
            model_name='packinglist',
            name='first_name',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
        migrations.AddField(
            model_name='packinglist',
            name='last_name',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
    ]
