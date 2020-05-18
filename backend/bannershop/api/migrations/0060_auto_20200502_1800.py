# Generated by Django 3.0.3 on 2020-05-02 18:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0059_auto_20200502_1206'),
    ]

    operations = [
        migrations.AlterField(
            model_name='boxesdetails',
            name='packing_list',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='boxes_set', to='api.PackingList'),
        ),
    ]
