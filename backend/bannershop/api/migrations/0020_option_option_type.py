# Generated by Django 3.0.3 on 2020-03-21 11:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_auto_20200321_1118'),
    ]

    operations = [
        migrations.AddField(
            model_name='option',
            name='option_type',
            field=models.IntegerField(choices=[(5, 'Flat Rate'), (4, 'Percentage'), (6, 'quantity Based')], default=6),
        ),
    ]
