# Generated by Django 2.0 on 2018-06-28 07:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('outcomes', '0003_expense_date_created'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='expense',
            name='timestamp',
        ),
    ]