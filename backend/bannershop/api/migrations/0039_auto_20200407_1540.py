# Generated by Django 3.0.3 on 2020-04-07 15:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0038_auto_20200406_1521'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='suboption',
            options={'ordering': ('-option', 'price')},
        ),
    ]
