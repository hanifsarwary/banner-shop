# Generated by Django 3.0.3 on 2020-05-10 11:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0068_auto_20200509_0645'),
    ]

    operations = [
        migrations.AddField(
            model_name='boxesdetails',
            name='job_name',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
    ]
