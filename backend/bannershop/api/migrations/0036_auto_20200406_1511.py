# Generated by Django 3.0.3 on 2020-04-06 15:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0035_auto_20200405_0925'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='suboption',
            options={'ordering': ('price', 'option')},
        ),
    ]
