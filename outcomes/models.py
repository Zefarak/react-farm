from django.db import models
from django.db.models import Sum
from farms.models import Crop
from users.models import CustomUser
import datetime
# Create your models here.


class ExpenseCategory(models.Model):
    title = models.CharField(unique=True, max_length=100)

    def __str__(self):
        return self.title


class Expense(models.Model):
    date_created = models.DateField(null=True)
    title = models.CharField(max_length=100, blank=True)
    final_value = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    crop_related = models.ForeignKey(Crop, blank=True, null=True, on_delete=models.SET_NULL)
    category = models.ForeignKey(ExpenseCategory, on_delete=models.SET_NULL, null=True)
    
    is_paid = models.BooleanField(default=True)
    is_taxes = models.BooleanField(default=False)
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.title

    


class PayrollCategory(models.Model):
    title = models.CharField(unique=True, max_length=100)

    def __str__(self):
        return self.title


class Payroll(models.Model):
    timestamp = models.DateField()
    date_end = models.DateField()
    title = models.CharField(max_length=100, blank=True)
    final_value = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    crop_related = models.ForeignKey(Crop, blank=True, null=True, on_delete=models.SET_NULL)
    is_paid = models.BooleanField(default=True)
    is_taxes = models.BooleanField(default=False)
    category = models.ForeignKey(PayrollCategory, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.title