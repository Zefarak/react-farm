# Generated by Django 2.0.5 on 2018-07-21 17:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('farms', '0006_auto_20180705_0650'),
    ]

    operations = [
        migrations.AlterField(
            model_name='farm',
            name='area',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=20),
        ),
    ]
