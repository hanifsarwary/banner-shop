# Generated by Django 3.0.3 on 2020-03-23 08:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0021_auto_20200321_1655'),
    ]

    operations = [
        migrations.AlterField(
            model_name='option',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Product'),
        ),
        migrations.AlterField(
            model_name='suboption',
            name='option',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Option'),
        ),
    ]
