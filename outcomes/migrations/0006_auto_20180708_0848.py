# Generated by Django 2.0.5 on 2018-07-08 05:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('outcomes', '0005_auto_20180630_2047'),
    ]

    operations = [
        migrations.AddField(
            model_name='payrollcategory',
            name='is_public',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='payrollcategory',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]