# Generated by Django 3.0.3 on 2020-04-06 15:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0037_auto_20200406_1512'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='option',
            options={'ordering': ('product', 'is_suboptions', 'option_name')},
        ),
    ]
