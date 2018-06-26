from django.db import models
from users.models import CustomUser
from farms.models import Crop
# Create your models here.

class Invoice(models.Model):
    title = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)
    edited = models.DateTimeField(auto_now=True)
    value = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    final_value = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    paid_value = models.DecimalField(max_digits=20, decimal_places=2, default=0)
    is_paid = models.BooleanField(default=False)
    crop_related = models.ForeignKey(Crop, null=True, blank=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(CustomUser, null=True, on_delete=models.SET_NULL, related_name='invoices')

    def __str__(self):
        return f'{self.title}'