# Generated by Django 3.0.3 on 2020-05-01 07:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0056_auto_20200428_0548'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customorder',
            name='job_number',
        ),
        migrations.AddField(
            model_name='customorder',
            name='final_size',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
    ]