# Generated by Django 2.0 on 2018-06-26 10:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('incomes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoice',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='invoices', to=settings.AUTH_USER_MODEL),
        ),
    ]
