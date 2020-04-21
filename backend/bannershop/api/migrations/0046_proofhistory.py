# Generated by Django 3.0.3 on 2020-04-20 15:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0045_auto_20200419_1014'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProofHistory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateField()),
                ('comments', models.CharField(max_length=256, null=True)),
                ('custom_order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.CustomOrder')),
            ],
        ),
    ]