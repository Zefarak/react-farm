# Generated by Django 2.0.5 on 2018-06-13 04:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('farms', '0002_auto_20180610_1328'),
    ]

    operations = [
        migrations.AlterField(
            model_name='farm',
            name='crops',
            field=models.ManyToManyField(blank=True, limit_choices_to={'fieldfarm__user': models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)}, to='farms.Crop'),
        ),
    ]