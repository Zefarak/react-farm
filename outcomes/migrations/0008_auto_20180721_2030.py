# Generated by Django 2.0.5 on 2018-07-21 17:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('outcomes', '0007_auto_20180708_1015'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='payroll',
            options={'ordering': ['-date_end']},
        ),
    ]