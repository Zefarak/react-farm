# Generated by Django 2.0 on 2018-07-01 17:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('incomes', '0004_remove_invoice_edited'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoice',
            name='timestamp',
            field=models.DateField(),
        ),
    ]
