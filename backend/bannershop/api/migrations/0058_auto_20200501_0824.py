# Generated by Django 3.0.3 on 2020-05-01 08:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0057_auto_20200501_0726'),
    ]

    operations = [
        migrations.AlterField(
            model_name='boxesdetails',
            name='packing_list',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='boxes_set', to='api.PackingList'),
        ),
    ]
